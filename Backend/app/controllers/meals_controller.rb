class MealsController < ApplicationController

  def create
    meal = current_user.meals.new(meal_params)

    authorize meal

    if meal.save
      render json: meal
    else
      render json: { errors: meal.errors.full_messages }
    end
  end

  def index
    meals = policy_scope(Meal)
    render json: meals
  end

  private

  def meal_params
    params.permit(:meal_type, :food_name, :calories, :date)
  end

end