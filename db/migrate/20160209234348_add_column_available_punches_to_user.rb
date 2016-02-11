class AddColumnAvailablePunchesToUser < ActiveRecord::Migration
  def change
    add_column :users, :available_punches, :integer
  end
end
