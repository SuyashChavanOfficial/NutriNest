class CreateMealItems < ActiveRecord::Migration[7.2]
  def change
    create_table :meal_items do |t|
      t.references :meal, null: false, foreign_key: true
      t.string :food_name
      t.float :quantity
      t.string :unit
      t.integer :calories

      t.timestamps
    end
  end
end
