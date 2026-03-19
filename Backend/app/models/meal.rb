class Meal < ApplicationRecord
  belongs_to :user
  has_many :meal_items, dependent: :destroy

    enum meal_type: {
    breakfast: 0,
    lunch: 1,
    snacks: 2,
    dinner: 3
  }
end
