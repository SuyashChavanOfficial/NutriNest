class ChangeWorkoutFields < ActiveRecord::Migration[7.2]
  def change
    change_column :workouts, :duration, :integer, using: 'duration::integer'
    change_column :workouts, :calories_burned, :integer, using: 'calories_burned::integer'
    change_column :workouts, :date, :date, using: 'date::date'
  end
end