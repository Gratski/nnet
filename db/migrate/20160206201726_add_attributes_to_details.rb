class AddAttributesToDetails < ActiveRecord::Migration
  def change
    create_table :sector do |t|
      t.string :name
      t.text :description
      t.timestamps null: false
    end
  end
end
