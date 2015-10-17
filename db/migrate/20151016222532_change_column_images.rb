class ChangeColumnImages < ActiveRecord::Migration
  def change
    remove_column :images, :user_id
    add_column :images, :classified_id, :integer
  end
end
