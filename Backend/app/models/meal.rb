class Meal < ApplicationRecord
  belongs_to :user


    enum meal_type: {
    breakfast: 0,
    lunch: 1,
    snacks: 2,
    dinner: 3
  }
end
