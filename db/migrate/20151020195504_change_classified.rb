class ChangeClassified < ActiveRecord::Migration
  def change
    add_column :classifieds, :address, :string
    add_column :classifieds, :lat, :integer
    add_column :classifieds, :lng, :integer
  end
end
