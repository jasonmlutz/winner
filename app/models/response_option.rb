# == Schema Information
#
# Table name: response_options
#
#  id         :uuid             not null, primary key
#  position   :integer          not null
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  parent_id  :uuid             not null
#
class ResponseOption < ApplicationRecord
    validates :position, :title, :parent_id, presence: true
  
  belongs_to :question, foreign_key: :parent_id
end
