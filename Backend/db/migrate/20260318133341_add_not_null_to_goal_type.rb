class AddNotNullToGoalType < ActiveRecord::Migration[7.2]
  def change
    change_column_null :goals, :goal_type, false
  end
end