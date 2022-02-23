# == Schema Information
#
# Table name: users
#
#  id              :uuid             not null, primary key
#  name            :string           not null
#  password_digest :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true, uniqueness: true

  has_many :surveys, foreign_key: :author_id, dependent: :destroy
  has_many :responses, foreign_key: :respondent_id, dependent: :destroy

  def expose(*exposedKeys)
    exposedKeys.concat(["name", "id"])
    self.attributes.select { |k, v| exposedKeys.include?(k)}
  end

end
