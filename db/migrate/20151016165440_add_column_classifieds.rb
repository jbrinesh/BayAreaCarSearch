class AddColumnClassifieds < ActiveRecord::Migration
  def change
    add_column :classifieds, :img_ref, :string
  end
end
