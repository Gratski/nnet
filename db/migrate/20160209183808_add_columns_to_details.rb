class AddColumnsToDetails < ActiveRecord::Migration
  def change
    add_column :details, :hair_color, :string
    add_column :details, :eye_color, :string
    add_column :details, :height, :double
    add_column :details, :body_type, :string
    add_column :details, :body_color, :string
    add_column :details, :religion, :string
  end
end
