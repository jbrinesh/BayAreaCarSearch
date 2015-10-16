# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

car1 = Car.create(make: "toyota", model: "camry", year: 2005)
car2 = Car.create(make: "toyota", model: "camry", year: 2006)
car3 = Car.create(make: "toyota", model: "camry", year: 2007)
car4 = Car.create(make: "toyota", model: "camry", year: 2008)
car5 = Car.create(make: "toyota", model: "camry", year: 2009)
car6 = Car.create(make: "toyota", model: "4runner", year: 2005)
car7 = Car.create(make: "toyota", model: "4runner", year: 2006)
car8 = Car.create(make: "toyota", model: "4runner", year: 2007)
car9 = Car.create(make: "toyota", model: "4runner", year: 2008)
car10 = Car.create(make: "toyota", model: "4runner", year: 2009)
car11 = Car.create(make: "bmw", model: "330i", year: 2005)
car12 = Car.create(make: "bmw", model: "330i", year: 2006)
car13 = Car.create(make: "bmw", model: "335i", year: 2007)
car14 = Car.create(make: "bmw", model: "335i", year: 2008)
car15 = Car.create(make: "bmw", model: "335i", year: 2009)

user1 = User.create(username: "user_1", password: "password")
user2 = User.create(username: "user_2", password: "password")
user3 = User.create(username: "user_3", password: "password")
user4 = User.create(username: "user_4", password: "password")
user5 = User.create(username: "user_5", password: "password")


ad1 = Classified.create(
  title: "2007 Toyota Camry title foobar",
  body: " this is the body of  ad 1",
  status: "active",
  price: 13500,
  odometer: 23546,
  car_id: car3.id,
  author_id: user1.id,
  img_ref: "toyota-camry_tievpy.jpg"
)

ad2 = Classified.create(
  title: "2005 Toyota Camry title",
  body: " this is the body of ad 2 foobar",
  status: "active",
  price: 11500,
  odometer: 73546,
  car_id: car1.id,
  author_id: user1.id,
  img_ref: "toyota-camry_tievpy.jpg"
)

ad3 = Classified.create(
  title: "2005 Toyota 4runner title",
  body: " this is the body of  ad 3",
  status: "active",
  price: 7000,
  odometer: 215000,
  car_id: car6.id,
  author_id: user1.id
)

ad4 = Classified.create(
  title: "2009 Toyota 4runner title",
  body: " this is the body of  ad 4",
  status: "active",
  price: 10500,
  odometer: 123546,
  car_id: car10.id,
  author_id: user1.id
)

ad5 = Classified.create(
  title: "2009 Toyota Camry title",
  body: " this is the body of  ad 5",
  status: "active",
  price: 15500,
  odometer: 12354,
  car_id: car5.id,
  author_id: user1.id,
  img_ref: "toyota-camry_tievpy.jpg"
)

ad6 = Classified.create(
  title: "2009 Toyota Camry diffrent title",
  body: " this is the body of  ad 6",
  status: "active",
  price: 14000,
  odometer: 22354,
  car_id: car5.id,
  author_id: user2.id,
  img_ref: "toyota-camry_tievpy.jpg"
)

ad7 = Classified.create(
  title: "2009 Toyota Camry another title",
  body: " this is the body of  ad 7",
  status: "active",
  price: 20000,
  odometer: 7354,
  car_id: car5.id,
  author_id: user2.id,
  img_ref: "toyota-camry_tievpy.jpg"
)

ad8 = Classified.create(
  title: "2008 Toyota 4runner title",
  body: " this is the body of  ad 8",
  status: "active",
  price: 10500,
  odometer: 123546,
  car_id: car9.id,
  author_id: user2.id,
  img_ref: "toyota_4runner_nsmmdt.jpg"

)

ad9 = Classified.create(
  title: "2006 Toyota 4runner title",
  body: " this is the body of  ad 9",
  status: "active",
  price: 11500,
  odometer: 85000,
  car_id: car7.id,
  author_id: user2.id,
  img_ref: "toyota_4runner_nsmmdt.jpg"
)

ad10 = Classified.create(
  title: "2006 Toyota 4runner title",
  body: " this is the body of  ad 10",
  status: "active",
  price: 5500,
  odometer: 323546,
  car_id: car7.id,
  author_id: user3.id,
  img_ref: "toyota_4runner_nsmmdt.jpg"
)

ad11 = Classified.create(
  title: "2006 BMW 330i title",
  body: " this is the body of  ad 11",
  status: "active",
  price: 15500,
  odometer: 83546,
  car_id: car12.id,
  author_id: user3.id,
  img_ref: "bmw-330i_ep8e1o.jpg"
)

ad12 = Classified.create(
  title: "2006 BMW 330i title",
  body: " this is the body of  ad 12",
  status: "active",
  price: 6500,
  odometer: 183546,
  car_id: car12.id,
  author_id: user4.id,
  img_ref: "bmw-330i_ep8e1o.jpg"
)

ad13 = Classified.create(
  title: "2009 BMW 335i title",
  body: " this is the body of  ad 13",
  status: "active",
  price: 36500,
  odometer: 23546,
  car_id: car15.id,
  author_id: user4.id,
  img_ref: "bmw-330i_ep8e1o.jpg"
)

ad14 = Classified.create(
  title: "2008 BMW 335i title",
  body: " this is the body of  ad 14",
  status: "active",
  price: 29500,
  odometer: 53546,
  car_id: car14.id,
  author_id: user4.id,
  img_ref: "bmw-330i_ep8e1o.jpg"

)

ad15 = Classified.create(
  title: "2005 BMW 330i title",
  body: " this is the body of  ad 15",
  status: "active",
  price: 7500,
  odometer: 153546,
  car_id: car11.id,
  author_id: user4.id,
  img_ref: "bmw-330i_ep8e1o.jpg"
)
