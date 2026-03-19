class CreateGoals < ActiveRecord::Migration[7.2]
  def change
    create_table :goals do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :goal_type

      t.timestamps
    end
  end
end
