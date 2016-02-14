class AddLookingForToSearch < ActiveRecord::Migration
  def change
    add_column :searches, :looking_for, :string
  end
end
