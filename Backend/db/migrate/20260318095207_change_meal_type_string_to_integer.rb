class ChangeMealTypeStringToInteger < ActiveRecord::Migration[7.2]
  def change
    change_column :meals, :meal_type, :integer, using: 'meal_type::integer'
  end
end
