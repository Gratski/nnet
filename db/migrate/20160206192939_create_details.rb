class CreateDetails < ActiveRecord::Migration
  def change
    create_table :details do |t|
      t.integer :user_id
      t.text :self_description
  
      t.timestamps null: false
    end
  end
end
