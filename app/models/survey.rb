# == Schema Information
#
# Table name: surveys
#
#  id         :uuid             not null, primary key
#  publish    :boolean          default(FALSE)
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author_id  :uuid             not null
#
class Survey < ApplicationRecord
  validates :title, presence: true
  
  belongs_to :author, class_name: :User, foreign_key: :author_id 
  
  has_many :questions, foreign_key: :parent_id, dependent: :destroy
  has_many :response_options, foreign_key: :grandparent_id, dependent: :destroy
end
