class AddColumnToUsers < ActiveRecord::Migration
  def change
    add_column :users, :city_id, :integer
    add_column :users, :country_id, :integer
  end
end
