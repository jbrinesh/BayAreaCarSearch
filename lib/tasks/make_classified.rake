task :make_classified, [:url] => :environment do |t, arg|
  domain = arg.url
  scraper = Mechanize.new
  scraper.history_added = Proc.new { sleep 1 }
  scraper.get(domain) do |index_page|
    data = index_page.search('div.content p.row')
    data.each do |row|
      match = /href=\"(.*?)\"/.match(row.to_s)
      show_page = "http://sfbay.craigslist.org" + match[1].to_s unless match.nil?
      scraper.get(show_page) do |page|
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

        if car.nil?
          puts("Was unable to scrape the given page")
        else
          body = page.search('section #postingbody').to_s[26...-10]
          title = />(.*)-/.match(page.search('span.postingtitletext').to_s)
          title = title[1][0...-1] unless title.nil?
          price = /\$(\d*)</.match(page.search('span.postingtitletext').to_s)
          price = price[1].to_i unless price.nil?
          city =  /\((.*?)\/|\)/.match(page.search('span.postingtitletext').to_s)
          city = city[1][0...-1] unless city.nil?
          odometer = /odometer: <b>(\d*)</.match(page.search('p.attrgroup').to_s)
          odometer = odometer[1].to_i unless odometer.nil?

          classified = Classified.new({
            car_id: car.id,
            author_id: 1,
            status: 'active',
            title: title,
            body: body,
            price: price,
            odometer: odometer,
          })

          unless city.nil?
            url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{URI.escape(city)}+CA&key=AIzaSyAwjuIHWVTJEM08Oqc_dADXrpyCUjxj23g"
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

            classified["lat"] = lat + lat_delta

            classified["lng"] = lng + lng_delta

            classified["address"] = address

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
            puts("classified was added to database")
          else
            puts("Was unable to scrape the given page")
          end
        end
      end
    end
  end
end
