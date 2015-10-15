class AddColumnToClassifieds < ActiveRecord::Migration
  def change
    add_column :classifieds, :author_id, :string, null: false 
  end
end
