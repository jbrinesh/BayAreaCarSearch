class Classified < ActiveRecord::Base
  validates :title, :body, :status, :price, :odometer, :car_id, presence: true

  belongs_to :car

  has_many :images

  DEFAULT_CAR_PARAMS = {
    "make" => "",
    "model" => "",
    "min_year" => 1900,
    "max_year" => 2020
  }

  DEFAULT_SEARCH_PARAMS = {
    "min_price" => 0,
    "max_price" => 1000000,
    "min_odometer" => 0,
    "max_odometer" => 1000000
  }


  def self.find_by_params(params_hash)
    keyword = "%#{params_hash[:keyword]["keyword"]}%"
    car_params = params_hash[:car_params]
    search_params = Classified.convert_to_range(params_hash[:search_params])
    self.includes(:car)
      .includes(:images)
      .where(search_params)
      .where("classifieds.body LIKE ? OR classifieds.title LIKE ?", keyword, keyword)
      .references(:cars)
      .where("cars.make = :make AND cars.model = :model", car_params)
      .where("cars.year BETWEEN :min_year AND :max_year", car_params)
  end

  def self.find_by_author_id(author_id)
    self.includes(:car)
        .where("classifieds.author_id = ?", author_id)
  end

  def self.convert_to_range(search_params)
    search_params_ranged = {}

    if search_params["min_price"] || search_params["max_price"]

      if search_params["min_price"] == ""
        start_price = 0
      else
        start_price = search_params["min_price"].to_i
      end

      if search_params["max_price"] == ""
        end_price = 100000000
      else
        end_price = search_params["max_price"].to_i
      end

      search_params_ranged["price"] = (start_price..end_price)
    end

    if search_params["min_odometer"] || search_params["max_odometer"]

      if search_params["min_odometer"] == ""
        start_odometer = 0
      else
        start_odometer = search_params["min_odometer"].to_i
      end

      if search_params["max_odometer"] == ""
        end_odometer = 100000000
      else
        end_odometer = search_params["max_odometer"].to_i
      end
      search_params_ranged["odometer"] = (start_odometer..end_odometer)
    end

    return search_params_ranged

  end

end

#
# params = {
#   keyword: "foobar",
#   car_params: {
#     make: "toyota",
#     model: "camery",
#     min_year: 2006,
#     max_year: 2009
#   },
#   search_params: {
#     max_price: 20000
#   }
# }
#
# params = {
#   car_params: {
#     make: "toyota",
#     model: "4runner",
#     min_year: 2005,
#     max_year: 2009
#   },
#   search_params: {
#     max_odometer: 200000,
#     min_price: 1000,
#     max_price: 10000
#   }
# }

# $.ajax({
#   url: "api/classified",
#   type: "GET",
#   dataType: "json",
#   data: {
#     car_params: {
#       make: "toyota",
#       model: "camery",
#       min_year: 2009,
#       max_year: 2009
#     },
#     search_params: {
#       odometer: (0..100000)
#     },
#   success: function(response){
#     console.log(response);
#   }
# })
