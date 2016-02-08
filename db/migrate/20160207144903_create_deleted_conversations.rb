class CreateDeletedConversations < ActiveRecord::Migration
  def change
    create_table :deleted_conversations do |t|
      t.integer :user_id
      t.integer :conversation_id
      t.timestamps
    end
  end
end
