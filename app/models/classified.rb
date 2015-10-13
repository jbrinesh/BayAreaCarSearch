class Classified < ActiveRecord::Base
  validates :title, :body, :status, :price, :odometer, :author_id, :car_id, presence: true

  belongs_to :cars
end
