class RemoveColumnClassifieds < ActiveRecord::Migration
  def change
    remove_column :classifieds, :img_ref 
  end
end
