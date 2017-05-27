class CreateOrders < ActiveRecord::Migration[5.1]
  def change

    create_table :orders do |t|
      t.string :name, null: false
      t.string :notes
      t.timestamps
    end

    create_table :coffee_orders do |t|
      t.string :bean
      t.string :coffee_temperature
      t.string :cream
      t.string :cream_temperature
      t.string :notes

      t.references :order

      t.timestamps
    end
  end
end

