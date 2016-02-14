class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.integer :user_id
      t.string :name
      t.boolean :profile
      t.timestamps null: false
    end
  end
end
