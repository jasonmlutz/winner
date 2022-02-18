class Api::ResponsesController < ApplicationController
  before_action :set_response, only: [:show, :destroy]
  wrap_parameters false
  # POST /api/responses
  def create
    @response = Response.new(response_params)
    if @response.save
      render json: @response
    else
      render json: {message: "error: response not created"}
    end
  end

  # GET /api/responses/:id
  def show
    if @response
      @response = @response.attributes.merge("respondent_name": @response.respondent.name)
      render json: @response
    else
      render json: {message: "error: no response found"}
    end
  end

  # GET /api/users/:user_id/responses
  # GET /api/surveys/:survey_id/responses
  def index
    if params[:user_id]
      @responses = User.find(params[:user_id]).responses
      @responses = @responses.to_a.map do |response|
        response = response.attributes.merge("survey_title": response.survey.title)
      end
    end
    if params[:survey_id]
      @responses = Survey.find(params[:survey_id]).responses
      @responses = @responses.to_a.map do |response|
        response = response.attributes.merge("respondent_name": response.respondent.name, "survey_title": response.survey.title)
      end
    end
    render json: @responses
  end

  # DELETE /api/responses/:id
  def destroy
    if @response && @response.destroy
      render json: {message: "response deleted"}
    else
      render json: {message: "unable to delete response"}
    end
  end

  private
    def response_params
      params.permit(:survey_id, :respondent_id)
    end

    def set_response
      @response = Response.find(params[:id])
    end
end
