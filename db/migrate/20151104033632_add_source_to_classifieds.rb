class AddSourceToClassifieds < ActiveRecord::Migration
  def change
    add_column :classifieds, :source, :string
  end
end
