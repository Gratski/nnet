class CreateSearches < ActiveRecord::Migration
  def change
    create_table :searches do |t|
      t.integer :user_id
      t.integer :country_id
      t.integer :city_id
      t.integer :min_age
      t.integer :max_age

      t.timestamps null: false
    end
  end
end
