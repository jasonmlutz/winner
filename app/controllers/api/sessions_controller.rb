class Api::SessionsController < ApplicationController
  before_action :set_current_user, only: [:show, :destroy]

  # GET /api/session
  def show
    render json: @user if @user
  end

  # POST /api/session
  def create
    @user = User.find_by(name: params[:name])&.authenticate(params[:password])
        if @user
      render json: @user.expose("session_token")
    else
      render json: @user.errors
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
