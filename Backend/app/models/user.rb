class User < ApplicationRecord
  has_secure_password
  has_many :meals
  has_many :workouts


  validates :email, presence: true, uniqueness: true
  validates :first_name, presence: true
  
   

end
