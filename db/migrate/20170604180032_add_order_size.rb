class AddOrderSize < ActiveRecord::Migration[5.1]
  def change
    add_column :coffee_orders, :size, :string
  end
end
