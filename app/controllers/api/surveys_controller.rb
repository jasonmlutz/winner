class Api::SurveysController < ApplicationController
  before_action :set_survey, only: [:show, :update, :destroy, :publish_status]
  wrap_parameters false

  # GET /api/publish_status/:id(.:format)
  def publish_status
    if @survey
      @questions = @survey.questions
      response_options_status  = {}
      @questions.each do |question|
        response_options_status[question.id] = question.response_options.count
      end
      render json: {number_of_questions: @questions.count, response_options_status: response_options_status}
    else
      render json: {error: "record(s) not found"}
    end
  end

  # GET /api/users/:user_id/surveys 
  # GET /api/surveys
  def index
    if params[:user_id]
      @surveys = User.find_by(id: params[:user_id]).surveys
      if !current_user || (current_user.id != params[:user_id])
        @surveys = @surveys.to_a.select {|survey| survey.publish}
      end
    else
      @surveys = Survey.all
    end
    @surveys = @surveys.to_a.map do |survey|
      survey = survey.attributes.merge("author_name": survey.author.name)
    end
    render json: @surveys
  end

  # GET /api/surveys/:id
  def show
   if @survey
    @survey = @survey.attributes.merge("author_name": @survey.author.name)
     render json: @survey
   else
     render json: {error: "record(s) not found"}
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
