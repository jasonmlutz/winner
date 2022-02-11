class Api::ResponseOptionsController < ApplicationController
  before_action :set_response_option, only: [:show, :destroy, :update]
  before_action :set_question, only: [:index]
  wrap_parameters false

  # GET    /api/questions/:question_id/response_options
  def index
    @response_option = @question.response_options.order(position: :asc)
    render json: @response_option
  end

  # POST   /api/questions/:question_id/response_options
  def create
    @response_option = ResponseOption.new(response_option_params)
    @response_option.parent_id = params[:question_id]
    if @response_option.save
      render json: @response_option
    else
      render json: {message: "error: response option not created"}
    end
  end

  # PATCH  /api/response_options/:id
  # PUT    /api/response_options/:id
  def update
    @response_option.update(response_option_params)
  end

  # DELETE /api/response_options/:id(.:format)
  def destroy
    if @response_option && @response_option.destroy
      render json: {message: "response option deleted"}
    else
      render json: {message: "unable to delete response option"}
    end
  end

  def response_option_params
      params.permit(:title, :position, :grandparent_id)
    end

    def set_response_option
      @response_option = ResponseOption.find(params[:id])
    end

    def set_question
      @question = Question.find(params[:question_id])
    end
end
