class AlterPunchesToSetUserAssociation < ActiveRecord::Migration
  def change
    remove_column :punches, :user_punched
    add_column :punches, :user_punched_id, :integer
  end
end
