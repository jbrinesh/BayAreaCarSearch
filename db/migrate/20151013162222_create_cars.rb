class CreateCars < ActiveRecord::Migration
  def change
    create_table :cars do |t|
      t.string :make, null: false
      t.string :model, null: false
      t.integer :year, null: false
    end

    add_index :cars, [:make, :model, :year], unique: true
  end
end
