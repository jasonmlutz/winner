# == Schema Information
#
# Table name: answers
#
#  id                 :bigint           not null, primary key
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  response_id        :uuid             not null
#  response_option_id :uuid             not null
#
class Answer < ApplicationRecord
  validates :response_id, :response_option_id, presence: true

  belongs_to :response, foreign_key: :response_id
  belongs_to :response_option, foreign_key: :response_option_id
  has_one :question, through: :response_option
  has_one :survey, through: :question
end
