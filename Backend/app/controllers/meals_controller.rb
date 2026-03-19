class MealsController < ApplicationController

  def create
    meal = current_user.meals.new(meal_params)

    authorize meal

    if meal.save
      render json: {
        id: meal.id,
        meal_type: meal.meal_type,
        date: meal.date
      }, status: :created
    else
      render json: { errors: meal.errors.full_messages }, status: :unprocessable_entity
    end
  end


  def index
    meals = policy_scope(Meal).includes(:meal_items)

    formatted_meals = meals.map do |meal|
      {
        type: meal.meal_type.capitalize,
        calories: meal.meal_items.sum(:calories),
        date: meal.date,
        created_at: meal.created_at,
        items: meal.meal_items.map do |item|
          {
            name: item.food_name.capitalize,
            calories: item.calories
          }
        end
      }
    end

    render json: formatted_meals
  end


  private

  def meal_params
    params.permit(:meal_type, :date)
  end

end