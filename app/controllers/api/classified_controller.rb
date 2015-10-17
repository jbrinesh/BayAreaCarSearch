class Api::ClassifiedController < ApplicationController

  def index
    @classifieds = Classified.find_by_params(params)
    render 'index'
  end

  def account_index
    if current_user.nil?
      render json: {}
    else
      author_id = current_user.id
      @classifieds = Classified.find_by_author_id(author_id)
      render 'index'
    end
  end

  def create
    image_paths = params['image_paths']
    car_params = {
      make: params['make'],
      model: params['model'],
      year: params['year']
    }

    classified_params = {
      title: params['title'],
      body: params['body'],
      price: params['price'],
      odometer: params['odometer']
    }

    car = Car.find_by(car_params)
    if car
      classified_params['car_id'] = car.id
      classified_params['status'] = 'active'
      classified_params['author_id'] = current_user.id
      @classified = Classified.new(classified_params)

      if @classified.save
        Image.add_paths(image_paths, @classified.id) unless image_paths.nil?
        render json: @classified
      else
        render json: @classified.errors.full_messages, :status => 422
      end
    else
      render json: ["Car not in database"], status: 422
    end


  end

end
