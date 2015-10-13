class Api::ClassifiedController < ApplicationController

  def index
    @classifieds = Classified.find_by_params(params)
  end

end
