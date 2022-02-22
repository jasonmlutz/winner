class Api::ResponseOptionsController < ApplicationController
  before_action :set_response_option, only: [:destroy, :update]
  wrap_parameters false

  # GET    /api/questions/:question_id/response_options
  # GET    /api/surveys/:survey_id/response_options
  def index
    if params[:question_id]
      @question = Question.find_by(id: params[:question_id])
      if @question
        @response_option = @question.response_options.order(position: :asc)
        render json: @response_option
      else
        render json: {error: "record(s) not found"}      
      end
    elsif params[:survey_id]
      @survey = Survey.find_by(id: params[:survey_id])
      if @survey
      @response_options = @survey.response_options
      render json: @response_options
      else
        render json: {error: "record(s) not found"}      
      end
    end
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
      @response_option = ResponseOption.find_by(id: params[:id])
    end
end
