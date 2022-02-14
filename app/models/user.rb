# == Schema Information
#
# Table name: users
#
#  id              :uuid             not null, primary key
#  name            :string           not null
#  password_digest :string
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true, uniqueness: true

  has_many :surveys, foreign_key: :author_id, dependent: :destroy

  after_initialize :ensure_session_token

  def protect(protectedKeys = ["password_digest", "created_at", "updated_at"])
    output = {}
    self.attributes.keys.map do |key|
      output[key] = self[key] unless protectedKeys.include?(key)
    end
    output
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

end
