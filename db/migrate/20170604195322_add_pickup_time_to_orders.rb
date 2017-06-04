class AddPickupTimeToOrders < ActiveRecord::Migration[5.1]
  def change
    add_column :orders, :pickup_time, :datetime
  end
end
