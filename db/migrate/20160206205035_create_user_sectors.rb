class CreateUserSectors < ActiveRecord::Migration
  def change
    create_table :user_sectors do |t|
      t.integer :user_id
      t.integer :sector_id
      t.timestamps null: false
    end
  end
end
