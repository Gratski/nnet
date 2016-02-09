class CreateSectors < ActiveRecord::Migration
  def change
    drop_table :sectors
    drop_table :sector_areas

    create_table :sectors do |t|
      t.string :name
      t.timestamps null: false
    end

    create_table :sector_areas do |t|
      t.integer :sector_id
      t.string :name
      t.timestamps null: false
    end
  end
end
