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
    if @user
      render json: @user.expose
    else
      render json: {error: "record(s) not found"}
    end
  end

  # POST /api/users(.:format)
  def create
    @user = User.find_by(name: params[:name])
    if @user
      render json: {error: "name not available"}
    else
      @user = User.new(user_params)
      if @user.save
        render json: @user.expose("session_token")
      else
        render json: {error: "object(s) not created"}
      end
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
    @user = User.find_by(id: params[:id])
  end

  def authenticate_user
    @user = User.find(params[:id])&.authenticate(params[:password])
    puts @user
  end

end
