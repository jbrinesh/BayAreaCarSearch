class Classified < ActiveRecord::Base
  validates :title, :body, :status, :price, :odometer, :car_id, presence: true

  belongs_to :car

  has_many :images

  def self.find_by_params(params_hash)

    query = self.includes(:car).includes(:images)

    unless params_hash[:keyword]["keyword"].strip.empty?
      keyword = "%#{params_hash[:keyword]["keyword"].downcase}%"
      query = query.where("classifieds.body LIKE ? OR classifieds.title LIKE ?", keyword, keyword)
    end

    unless params_hash[:odometer_params]["min_odometer"].strip.empty? &&
           params_hash[:odometer_params]["max_odometer"].strip.empty?

      min_odometer = params_hash[:odometer_params]["min_odometer"].strip.empty? ? 0 : params_hash[:odometer_params]["min_odometer"].to_i
      max_odometer = params_hash[:odometer_params]["max_odometer"].strip.empty? ? 1000000 : params_hash[:odometer_params]["max_odometer"].to_i

      query = query.where("classifieds.odometer BETWEEN ? AND ?", min_odometer, max_odometer)
    end

    unless params_hash[:price_params]["min_price"].strip.empty? &&
           params_hash[:price_params]["max_price"].strip.empty?

      min_price = params_hash[:price_params]["min_price"].strip.empty? ? 0 : params_hash[:price_params]["min_price"].to_i
      max_price = params_hash[:price_params]["max_price"].strip.empty? ? 1000000 : params_hash[:price_params]["max_price"].to_i

      query = query.where("classifieds.price BETWEEN ? AND ?", min_price, max_price)
    end

    unless params_hash[:location_params]["distance"].strip.empty? ||
           params_hash[:location_params]["lat"].strip.empty? ||
           params_hash[:location_params]["lat"].strip.empty?

      distance = params_hash[:location_params]["distance"].to_f

      min_lat = params_hash[:location_params]["lat"].to_f - (distance / 69)
      max_lat = params_hash[:location_params]["lat"].to_f + (distance / 69)

      min_lng = params_hash[:location_params]["lng"].to_f - (distance / 55)
      max_lng = params_hash[:location_params]["lng"].to_f + (distance / 55)

      query = query.where("classifieds.lat BETWEEN ? AND  ?", min_lat, max_lat)
      query = query.where("classifieds.lng BETWEEN ? AND  ?", min_lng, max_lng)
    end

    query = query.references(:cars)

    unless params_hash[:car_params]["make"].strip.empty?
      car_make = "%#{params_hash[:car_params]["make"].downcase}%"

      query = query.where("cars.make LIKE ?", car_make)
    end

    unless params_hash[:car_params]["model"].strip.empty?
      car_model = "%#{params_hash[:car_params]["model"].downcase}%"

      query = query.where("cars.model LIKE ?", car_model)
    end

    unless params_hash[:car_params]["min_year"].strip.empty? &&
           params_hash[:car_params]["max_year"].strip.empty?

      min_year = params_hash[:car_params]["min_year"].strip.empty? ? 1900 : params_hash[:car_params]["min_year"].to_i
      max_year = params_hash[:car_params]["max_year"].strip.empty? ? 2020 : params_hash[:car_params]["max_year"].to_i

      query = query.where("cars.year BETWEEN ? AND ?", min_year, max_year)
    end

    return query.order(created_at: :desc).limit(params_hash["limit"].to_i)
  end

  def self.find_by_author_id(author_id)
    self.includes(:car)
        .includes(:images)
        .where("classifieds.author_id = ?", author_id)
  end
end
