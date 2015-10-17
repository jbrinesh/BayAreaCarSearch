class ChangeImages < ActiveRecord::Migration
  def change
    remove_column :images, :classified_id, :integer
    add_column :images, :classified_id, :integer, null: false
  end
end
