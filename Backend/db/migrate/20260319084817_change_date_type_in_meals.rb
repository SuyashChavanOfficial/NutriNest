class ChangeDateTypeInMeals < ActiveRecord::Migration[7.2]
  def change
     change_column :meals, :date, :date, using: 'date::date'
  end
end
