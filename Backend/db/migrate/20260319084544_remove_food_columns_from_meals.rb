class RemoveFoodColumnsFromMeals < ActiveRecord::Migration[7.2]
  def change

    remove_column :meals, :food_name, :string
    remove_column :meals, :calories, :string

  end
end
