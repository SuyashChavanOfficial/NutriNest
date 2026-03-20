class User < ApplicationRecord
  has_secure_password

  # Associations
  has_many :meals
  has_many :workouts
  has_one :goal, dependent: :destroy

  # Constants
  REQUIRED_PROFILE_FIELDS = %i[age height weight gender]

  # Validations
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :gender, inclusion: { in: %w[male female] }, allow_blank: true
  
  validates :email,
            presence: true,
            uniqueness: { case_sensitive: false },
            format: { with: URI::MailTo::EMAIL_REGEXP }

  validates :password, length: { minimum: 6 }, if: -> { password.present? }

  validates :age, numericality: { only_integer: true, greater_than: 0 }, allow_blank: true
  validates :height, numericality: { greater_than: 0 }, allow_blank: true
  validates :weight, numericality: { greater_than: 0 }, allow_blank: true

  # Callbacks
  before_create :generate_username

  # Profile Completion Methods
  def profile_complete?
    REQUIRED_PROFILE_FIELDS.all? { |field| self[field].present? }
  end

  def profile_completion_percentage
    total = REQUIRED_PROFILE_FIELDS.size
    filled = REQUIRED_PROFILE_FIELDS.count { |field| self[field].present? }

    ((filled.to_f / total) * 100).to_i
  end

  def missing_profile_fields
    REQUIRED_PROFILE_FIELDS.select { |field| self[field].blank? }
  end

  private

  def generate_username
    return if username.present?

    base = "#{first_name}#{last_name}".downcase.gsub(/\s+/, "")
    self.username = base

    count = 1
    while User.exists?(username: username)
      self.username = "#{base}#{count}"
      count += 1
    end
  end
end