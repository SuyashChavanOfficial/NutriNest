class ChangeExerciseStringToInteger < ActiveRecord::Migration[7.2]
  def change
   
      change_column :workouts, :exercise, :integer, using: 'exercise::integer'

  end
end
