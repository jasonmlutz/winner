class Api::SessionsController < ApplicationController
  before_action :set_current_user, only: [:show, :destroy]

  # GET /api/session
  def show
    if @user
      render json: @user.expose
    else
      render json: {}
    end
  end

  # POST /api/session
  def create
    @user = User.find_by(name: params[:name])
    if @user && @user == @user.authenticate(params[:password])
      render json: @user.expose
    else
      render json: {error: "name and/or password incorrect"}
    end
  end

  # DELETE /api/session
  def destroy
    if @user
      @user.reset_session_token!
      render json: {message: 'logout completed!'}
    else
      render json: {message: 'no user to logout!'}
    end
  end

  private

    def set_current_user
      @user = User.find_by(session_token: params[:session_token])
    end

end
