class CreateWorkouts < ActiveRecord::Migration[7.2]
  def change
    create_table :workouts do |t|
      t.references :user, null: false, foreign_key: true
      t.string :exerciese
      t.string :duration
      t.string :calories_burned
      t.string :date

      t.timestamps
    end
  end
end
