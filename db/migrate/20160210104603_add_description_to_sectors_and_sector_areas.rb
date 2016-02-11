class AddDescriptionToSectorsAndSectorAreas < ActiveRecord::Migration
  def change
    add_column :sectors, :summary, :text

    add_column :sector_areas, :summary, :text
  end
end
