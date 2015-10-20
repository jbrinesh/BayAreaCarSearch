class ChangeDataTypeClassifieds < ActiveRecord::Migration
  def change
    remove_column :classifieds, :lat
    remove_column :classifieds, :lng

    add_column :classifieds, :lat, :float
    add_column :classifieds, :lng, :float
  end
end
