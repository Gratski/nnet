class CreateCities < ActiveRecord::Migration
  def change
    create_table :cities do |t|
      t.integer :country_id
      t.string :name
      t.string :code
      t.float :latitude
      t.float :longitude
      t.timestamps null: false
    end
  end
end
