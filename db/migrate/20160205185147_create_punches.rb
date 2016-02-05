class CreatePunches < ActiveRecord::Migration
  def change
    create_table :punches do |t|
      t.integer :user_id
      t.integer :user_punched

      t.timestamps null: false
    end
  end
end
