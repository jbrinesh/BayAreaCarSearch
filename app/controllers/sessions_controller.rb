class SessionsController < ApplicationController

  def new
    if current_user && current_user.session_token == session[:session_token]
      redirect_to "/#/account"
    else
      render :new
    end
  end

  def create
    user = User.find_by_cridentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user
      sign_in(user)
      redirect_to "/#/account"
    else
      flash.now[:error] = ["Invalid username or password"]
      render :new
    end
  end

  def destroy
    sign_out
    render json: {}
  end
end
