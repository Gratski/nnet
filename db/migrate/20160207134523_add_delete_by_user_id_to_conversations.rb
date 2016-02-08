class AddDeleteByUserIdToConversations < ActiveRecord::Migration
  def change
    add_column :conversations, :deleted_by_user_1, :boolean, :default => false
    add_column :conversations, :deleted_by_user_2, :boolean, :default => false
  end
end
