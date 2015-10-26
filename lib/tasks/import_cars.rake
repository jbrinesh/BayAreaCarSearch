task import_cars: :environment do
  File.open("./car_data.sql", "r") do |f|
    f.each_line do |line|
      el = line[1...-3].split(", ")
      el[1] = el[1][1..-2].downcase
      el[2] = el[2][1..-2].downcase
      Car.create(year: el[0], make: el[1], model: el[2])
    end
  end
end
