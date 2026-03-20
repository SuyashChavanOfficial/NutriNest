class AddGoalCalorieToGoals < ActiveRecord::Migration[7.2]
  def change
    add_column :goals, :goal_calorie, :integer
  end
end
