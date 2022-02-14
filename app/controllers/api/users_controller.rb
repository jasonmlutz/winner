class Api::UsersController < ApplicationController
  before_action :set_user, only: [:show]
  before_action :authenticate_user, only: [:destroy]
  wrap_parameters false

  # GET /api/users
  def index
    @users = User.all.map { |user| user.expose }
    render json: @users
  end

  # GET /api/users/:id(.:format)
  def show
    render json: @user.expose
  end

  # POST /api/users(.:format)
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user.expose("session_token")
   else
     render json: {message: "error: user not created"}
   end
  end

  # DELETE /api/users/:id(.:format)
  def destroy
    if @user && @user.destroy
      render json: {message: "user deleted"}
    else
      render json: {message: "unable to delete user"}
    end
  end

  private
  def user_params
    params.permit(:name, :password, :password_confirmation)
  end

  def set_user
    @user = User.find(params[:id])
  end

  def authenticate_user
    @user = User.find(params[:id])&.authenticate(params[:password])
    puts @user
  end

end
