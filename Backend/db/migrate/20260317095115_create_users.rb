class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :age
      t.string :height
      t.string :gender
      t.string :email
      t.string :phone
      t.string :password_digest
      t.string :goal

      t.timestamps
    end
  end
end
