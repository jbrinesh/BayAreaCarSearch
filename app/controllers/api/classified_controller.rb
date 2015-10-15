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

end
