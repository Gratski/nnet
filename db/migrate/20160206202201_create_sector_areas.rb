class CreateSectorAreas < ActiveRecord::Migration
  def change
    create_table :sector_areas do |t|
      t.integer :sector_id
      t.string :name
      t.text :description
      t.timestamps null: false
    end

    add_column :users, :admin, :boolean
  end
end
