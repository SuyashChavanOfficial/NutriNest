class User < ApplicationRecord
  has_secure_password
  has_many :meals
  has_many :workouts
  has_one :goals

  validates :first_name, presence: true
  validates :last_name, presence: true

  validates :email, 
            presence: true, 
            uniqueness: { case_sensitive: false },
            format: { with: URI::MailTo::EMAIL_REGEXP }

  validates :password, length: { minimum: 6 }, if: -> { password.present? }

  validates :age, numericality: { only_integer: true, greater_than: 0 }, allow_blank: true
  validates :height, numericality: { greater_than: 0 }, allow_blank: true
  validates :weight, numericality: { greater_than: 0 }, allow_blank: true

  before_create :generate_username

  private

  def generate_username
    return if username.present?

    base = "#{first_name}#{last_name}".downcase.gsub(/\s+/, "")
    self.username = base

    count = 1
    while User.exists?(username: self.username)
      self.username = "#{base}#{count}"
      count += 1
    end
  end
end