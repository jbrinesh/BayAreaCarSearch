class Classified < ActiveRecord::Base
  validates :title, :body, :status, :price, :odometer, :car_id, presence: true

  belongs_to :car

  def self.find_by_params(params_hash)
    search_params, car_params = params_hash[:search_params], params_hash[:car_params]
    self.includes(:car)
      .joins(:car)
      .where(search_params)
      .references(:cars)
      .where("cars.make = :make AND cars.model = :model", car_params)
      .where("cars.year BETWEEN :min_year AND :max_year", car_params)

    # car_params = params_hash[:car_params]
    # search_params = params_hash[:search_params]
    # Classified.join(:cars).where(params_hash)
  end
end


# params = {
#   car_params: {
#     make: "toyota",
#     model: "camery",
#     min_year: 2006,
#     max_year: 2009
#   },
#   search_params: {
#     price: (0..20000)
#   }
# }

# params = {
#   car_params: {
#     make: "toyota",
#     model: "camery",
#     min_year: 2009,
#     max_year: 2009
#   },
#   search_params: {
#     odometer: (0..100000)
#   }
# }
