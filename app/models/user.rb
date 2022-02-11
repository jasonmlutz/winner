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

  def protect(protectedKeys = ["password_digest", "created_at", "updated_at"])
    output = {}
    self.attributes.keys.map do |key|
      output[key] = self[key] unless protectedKeys.include?(key)
    end
    output
  end
end
