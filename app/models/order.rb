class Order < ApplicationRecord
  has_many :coffee_orders


  def as_json(*args)
    super.merge(coffee_orders: coffee_orders.map(&:as_json))
  end

end

