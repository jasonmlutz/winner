# == Schema Information
#
# Table name: questions
#
#  id         :uuid             not null, primary key
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  parent_id  :uuid
#
class Question < ApplicationRecord
  validates :title, :parent_id, presence: true
  
  belongs_to :survey, foreign_key: :parent_id
end
