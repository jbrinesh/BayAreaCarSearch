class CreateClassifieds < ActiveRecord::Migration
  def change
    create_table :classifieds do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.string :status, null: false
      t.integer :price, null: false
      t.integer :odometer, null: false
      t.integer :author_id, null: false
      t.integer :car_id, null: false
      t.timestamps null: false
    end
    add_index :classifieds, :author_id
    add_index :classifieds, :car_id 
  end
end
