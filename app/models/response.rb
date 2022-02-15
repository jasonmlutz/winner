# == Schema Information
#
# Table name: responses
#
#  id            :uuid             not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  respondent_id :uuid             not null
#  survey_id     :uuid             not null
#
class Response < ApplicationRecord
  validates :respondent_id, presence: true

  belongs_to :respondent, class_name: :User, foreign_key: :respondent_id
  belongs_to :survey, foreign_key: :survey_id

  has_many :answers, foreign_key: :response_id, dependent: :destroy
end
