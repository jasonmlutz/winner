class Api::QuestionsController < ApplicationController
  before_action :set_question, only: [:show, :destroy, :update]
  before_action :set_survey, only: [:index]
  wrap_parameters false

  # GET /api/surveys/:survey_id/questions
  def index
    @questions = @survey.questions.order(position: :asc)
    render json: @questions
  end

  # POST /api/surveys/:survey_id/questions
  def create
    @question = Question.new(question_params)
    @question.parent_id = params[:survey_id]
    if @question.save
      render json: @question
    else
      render json: {message: "error: question not created"}
    end
  end

  # PATCH /api/questions/:id
  def update
    @question.update(question_params)
  end

  # DELETE /api/questions/:id
  def destroy
    if @question && @question.destroy
      render json: {message: "question deleted"}
    else
      render json: {message: "unable to delete question"}
    end
  end

  private
    def question_params
      params.permit(:title, :position)
    end

    def set_question
      @question = Question.find(params[:id])
    end

    def set_survey
      @survey = Survey.find(params[:survey_id])
    end
end
