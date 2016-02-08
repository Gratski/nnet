class ChangeSectorToSectors < ActiveRecord::Migration
  def change
    drop_table :sector
    create_table :sectors do |t|
      t.string :name
      t.text :description
      t.timestamps null: false
    end
  end
end
