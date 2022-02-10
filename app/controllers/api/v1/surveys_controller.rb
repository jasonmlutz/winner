class Api::V1::SurveysController < ApplicationController
  before_action :set_survey, only: [:show, :destroy]

  # GET /api/v1/surveys
  def index
    @surveys = Survey.all
    render json: @surveys
  end

  # GET /api/v1/surveys/:id
  def show
   if @survey
     render json: @survey
   else
     render json: {message: "error: no survey found"}
   end
  end

  # POST /api/v1/surveys
  def create
    @survey = Survey.new(survey_params)

   if @survey.save
     render json: @survey
   else
     render json: {message: "error: survey not created"}
   end
  end

  # DELETE /surveys/:id
  def destroy
    if @survey && @survey.destroy
      render json: {message: "survey deleted"}
    else
      render json: {message: "unable to delete survey"}
    end
  end

  private
    def survey_params
      params.permit(:title)
    end

    def set_survey
      @survey = Survey.find_by(id: params[:id])
    end
end
