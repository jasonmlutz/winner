class Api::AnswersController < ApplicationController
  before_action :set_response, only: [:index]
  wrap_parameters false
  # POST /api/responses/:response_id/answers

  def create
    @answer = Answer.new(answer_params)
    if @answer.save
      render json: @answer
    else
      render json: {message: "unable to create answer"}
    end

  # GET /api/responses/:response_id/answers
  def index
    @answers = @response.answers
    render json: @answers
  end

  private
    def answer_params
      params.permit(:response_id, :response_option_id)
    end

    def set_response
      @response = Response.find(params[:response_id])
end
