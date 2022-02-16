class Api::AnswersController < ApplicationController
  before_action :set_response, only: [:index]
  wrap_parameters false
  # POST /api/responses/:response_id/answers

  def create
    success = true
    params[:response_option_ids].each do |response_option_id|
      @answer = Answer.new(response_id: params[:response_id], response_option_id: response_option_id)
      if @answer.save
        success &&= true
      else
        success = false
      end
    end

    if success
      render json: {"message": "success"}
    else
      render json: {"message": "failed"}
    end
  end

  # GET /api/responses/:response_id/answers
  def index
    @answers = @response.answers
    render json: @answers
  end

  private
    def answer_params
      params.permit(:response_id, :response_option_ids)
    end

    def set_response
      @response = Response.find(params[:response_id])
    end
end
