class Api::SurveysController < ApplicationController
  before_action :set_survey, only: [:show, :update, :destroy]
  wrap_parameters false

  # GET /api/users/:user_id/surveys
  # GET /api/surveys
  def index
    if params[:user_id]
      @surveys = User.find(params[:user_id]).surveys
    else
      @surveys = Survey.all
    end
    render json: @surveys
  end

  # GET /api/surveys/:id
  def show
   if @survey
    @survey = @survey.attributes.merge("author_name": @survey.author.name)
     render json: @survey
   else
     render json: {message: "error: no survey found"}
   end
  end

  # POST /api/surveys
  def create
    @survey = Survey.new(survey_params)

   if @survey.save
     render json: @survey
   else
     render json: {message: "error: survey not created"}
   end
  end

  # PATCH /api/surveys/:id
  def update
    @survey.update(survey_params)
  end

  # DELETE /api/surveys/:id
  def destroy
    if @survey && @survey.destroy
      render json: {message: "survey deleted"}
    else
      render json: {message: "unable to delete survey"}
    end
  end

  private
    def survey_params
      params.permit(:title, :author_id, :publish)
    end

    def set_survey
      @survey = Survey.find_by(id: params[:id])
    end
end
