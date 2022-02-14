class Api::SurveysController < ApplicationController
  before_action :set_survey, only: [:show, :update, :destroy]
  wrap_parameters false

  # GET /api/surveys
  def index
    @surveys = Survey.all
    render json: @surveys
  end

  # GET /api/surveys/:id
  def show
   if @survey
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
      params.permit(:title, :author_id)
    end

    def set_survey
      @survey = Survey.find_by(id: params[:id])
    end
end
