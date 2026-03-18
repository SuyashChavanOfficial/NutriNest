class CreateMeals < ActiveRecord::Migration[7.2]
  def change
    create_table :meals do |t|
      t.references :user, null: false, foreign_key: true
      t.string :meal_type
      t.string :food_name
      t.string :calories
      t.string :date

      t.timestamps
    end
  end
end
