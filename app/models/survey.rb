# == Schema Information
#
# Table name: surveys
#
#  id         :uuid             not null, primary key
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Survey < ApplicationRecord
  validates :title, presence: true
  
  has_many :questions, foreign_key: :parent_id, dependent: :destroy
  has_many :response_options, foreign_key: :grandparent_id, dependent: :destroy
end
