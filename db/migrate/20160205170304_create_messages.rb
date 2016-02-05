class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :conversation_id
      t.integer :user_id
      t.text :body
      t.boolean :seen

      t.timestamps null: false
    end
  end
end
