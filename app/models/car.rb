class Car < ActiveRecord::Base
  validates :make, :model, :year, presence: true

  has_many :classifieds

  

end
