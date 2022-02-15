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
      render json: @response
    else
      render json: {message: "error: no response found"}
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
