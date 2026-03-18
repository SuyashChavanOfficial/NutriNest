class RenameExercieseToExercise < ActiveRecord::Migration[7.2]
  def change
      rename_column :workouts, :exerciese, :exercise
  end
end
