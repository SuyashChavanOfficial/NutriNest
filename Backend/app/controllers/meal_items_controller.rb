class MealItemsController < ApplicationController

  def create
    meal = Meal.find(params[:meal_id])

    meal_item = meal.meal_items.new(meal_item_params)

    authorize meal_item

    if meal_item.save
      render json: meal_item, status: :created
    else
      render json: { errors: meal_item.errors.full_messages }, status: :unprocessable_entity
    end
  end


  def index
    meal = Meal.find(params[:meal_id])

    meal_items = meal.meal_items

    render json: meal_items
  end


  def destroy
    meal_item = MealItem.find(params[:id])

    authorize meal_item

    meal_item.destroy

    render json: { message: "Item removed" }
  end


  private

  def meal_item_params
    params.permit(:food_name, :quantity, :unit)
  end

end