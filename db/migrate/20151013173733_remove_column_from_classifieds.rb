class RemoveColumnFromClassifieds < ActiveRecord::Migration
  def change
    remove_column :classifieds, :author_id
  end
end
