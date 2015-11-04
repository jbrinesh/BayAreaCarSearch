task :get_classifieds_from_web, [:url] => :environment do |t|

  def get_urls(scraper)
    root_domain = "http://sfbay.craigslist.org/search/cto?s="
    urls = []
    1.times do |page_num|
      domain =  root_domain + (page_num * 100).to_s
      scraper.get(domain) do |index_page|
        data = index_page.search('div.content p.row')
        data.each do |row|
          match = /href=\"(.*?)\"/.match(row.to_s)
          url = "http://sfbay.craigslist.org" + match[1].to_s unless match.nil?
          urls << url
        end
      end
    end
    return urls.uniq
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
      car = Car.find_by({year: year, make: make, model: model})
      if car.nil? && model_year_arr.length > 3
        model = model_year_arr[2].downcase + " " + model_year_arr[3].downcase
        car = Car.find_by({year: year, make: make, model: model})
      end
    end
    return car
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
  end

  def extract_odometer(page)
    odometer = /odometer: <b>(\d*)</.match(page.search('p.attrgroup').to_s)
    odometer = odometer[1].to_i unless odometer.nil?
  end

  def extract_location(page)
    city =  /\((.*?)\/|\)/.match(page.search('span.postingtitletext').to_s)
    city = city[1][0...-1] unless city.nil?
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
          if classified.save
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
        end
      end
    end
    return nil
  end

  scraper = Mechanize.new
  scraper.history_added = Proc.new { sleep 1 }
  all_urls = get_urls(scraper)
  all_urls.each do |url|
    classified = scrape_page(url, scraper)
  end
end
