class Api::ClassifiedController < ApplicationController

  def index
    @classifieds = Classified.find_by_params(params)
    render json: @classifieds
  end

end
