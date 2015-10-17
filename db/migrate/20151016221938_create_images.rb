class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.integer :user_id, null: false
      t.string :img_path, null: false
    end
    add_index :images, :user_id 
  end
end
