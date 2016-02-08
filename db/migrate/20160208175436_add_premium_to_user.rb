class AddPremiumToUser < ActiveRecord::Migration
  def change
    add_column :users, :premium, :boolean, :default => false
    add_column :users, :premium_payment, :date
    add_column :users, :premium_valid_date, :date
  end
end
