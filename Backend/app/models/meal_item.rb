class MealItem < ApplicationRecord
 
  belongs_to :meal

  before_save :calculate_calories

  private

  def calculate_calories
    self.calories = FoodCalorieCalculator.calculate(food_name, quantity)
  end
end
