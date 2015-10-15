class ChangeColumnInClassifieds < ActiveRecord::Migration
  def change
    remove_column :classifieds, :author_id
    add_column :classifieds, :author_id, :integer, null: false
  end
end
