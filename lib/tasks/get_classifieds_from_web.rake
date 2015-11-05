task :get_classifieds_from_web, [:url] => :environment do |t|

  def get_urls(scraper, page_num)
    domain = "http://sfbay.craigslist.org/search/cto?s=#{page_num * 100}&hasPic=1"
    urls = []
    scraper.get(domain) do |index_page|
      data = index_page.search('div.content p.row')
      data.each do |row|
        match = /href=\"(.*?)\"/.match(row.to_s)
        url = "http://sfbay.craigslist.org" + match[1].to_s unless match.nil?
        urls << url
      end
    end
    urls.uniq
  end

  def extract_car_data(page)
    model_year = page.search('div.mapAndAttrs p.attrgroup:nth-child(1) span b')
    if model_year.empty?
      model_year = page.search('div.mapAndAttrs p.attrgroup:nth-child(2) span b')
    end
    model_year_arr = model_year.to_s[3...-4].split(" ")
    unless model_year_arr.length < 3
      year = model_year_arr[0].to_i
      make = model_year_arr[1].downcase
      model = model_year_arr[2].downcase
      car = Car.where('cars.year = ?', year)
               .where('cars.make LIKE ?', make)
               .where('cars.model LIKE ?', model)
      if car.length > 1 && model_year_arr.length > 3
        model = model_year_arr[2].downcase + " " + model_year_arr[3].downcase
        car = Car.where('cars.year = ?', year)
                 .where('cars.make LIKE ?', make)
                 .where('cars.model LIKE ?', model)
      end
    end
    return car.first unless car.nil?
  end

  def extract_title(page)
    title = />(.*)-/.match(page.search('span.postingtitletext').to_s)
    title = title[1][0...-1] unless title.nil?
  end

  def extract_price(page)
    price = /\$(\d*)</.match(page.search('span.postingtitletext').to_s)
    price = price[1].to_i unless price.nil?
  end

  def extract_body(page)
    body = page.search('section #postingbody').to_s[26...-10]
    body.gsub!("<br>", " ")
    body.gsub!(/<a.*?a>/, "contact information removed")
  end

  def extract_odometer(page)
    odometer_match = /odometer: <b>(\d*)</.match(page.search('p.attrgroup').to_s)
    odometer = odometer_match[1].to_i unless odometer_match.nil?
  end

  def extract_location(page)
    city =  /\((.*?)\/|\)/.match(page.search('span.postingtitletext').to_s)
    city = city[1][0...-1] unless city.nil? || city[1].nil?
  end

  def extract_image_urls(page, classified)
    image_urls = []
    data = page.search('div#thumbs a')
    data.each do |el|
      url = /href=\"(.*?)\"/.match(el.to_s)
      image_urls << url[1].to_s
    end
    image_urls.each do |img_path|
      Image.create(classified_id: classified.id, img_path: img_path)
    end
  end

  def parse_location(location)
    url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{URI.escape(location)}+CA&key=AIzaSyAwjuIHWVTJEM08Oqc_dADXrpyCUjxj23g"
    uri = URI.parse(url)
    http = Net::HTTP.new(uri.host, 443)
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    http.use_ssl = true
    request = Net::HTTP::Get.new(uri.request_uri)
    response = JSON.parse(http.request(request).body)
    lat = response['results'][0]["geometry"]["location"]["lat"].to_f
    lng = response['results'][0]["geometry"]["location"]["lng"].to_f
    address = response['results'][0]["formatted_address"]

    lat_delta = rand / 69
    lng_delta = rand / 55

    parsed_location = {}

    parsed_location["lat"] = lat + lat_delta

    parsed_location["lng"] = lng + lng_delta

    parsed_location["address"] = address

    return parsed_location
  end


  def scrape_page(url, scraper)
    begin
      scraper.get(url) do |page|
        car = extract_car_data(page)
        unless car.nil?
          title = extract_title(page)
          price = extract_price(page)
          body = extract_body(page)
          odometer = extract_odometer(page)
          location = extract_location(page)
          unless title.nil? || price.nil? || body.nil? || odometer.nil?
            classified = Classified.new({
              car_id: car.id,
              author_id: 1,
              status: 'active',
              title: title,
              body: body,
              price: price,
              odometer: odometer,
              source: url
            })
            unless location.nil?
              parsed_location = parse_location(location)
              classified["lat"] = parsed_location["lat"]
              classified["lng"] = parsed_location["lng"]
              classified["address"] = parsed_location["address"]
            end
            existing_classified = Classified.find_by_source(url)
            if existing_classified.nil? && classified.save
              extract_image_urls(page, classified)
              return true
            end
          end
        end
      end
      return false
    rescue
      return false
    end
  end

  scraper = Mechanize.new
  scraper.history_added = Proc.new { sleep 0.25 }
  total_pages_added = 0
  total_pages = 0
  10.times do |page_num|
    pages_added = 0
    all_urls = get_urls(scraper, page_num)
    all_urls.each do |url|
      total_pages += 1
      puts "."
      if scrape_page(url, scraper)
        puts "+"
        pages_added += 1
      end
    end
    break if pages_added < 3
    total_pages_added += pages_added
  end
  puts total_pages_added.to_s + " " + "new classifieds, out of " + total_pages.to_s + " were add to the database successfully"
end
