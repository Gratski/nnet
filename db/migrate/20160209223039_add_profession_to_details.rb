class AddProfessionToDetails < ActiveRecord::Migration
  def change
    add_column :details, :sector_area_id, :integer
  end
end
