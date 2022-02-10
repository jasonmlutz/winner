# == Schema Information
#
# Table name: questions
#
#  id         :uuid             not null, primary key
#  position   :integer          not null
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  parent_id  :uuid             not null
#
class Question < ApplicationRecord
  validates :position, :title, :parent_id, presence: true
  
  belongs_to :survey, foreign_key: :parent_id
end
