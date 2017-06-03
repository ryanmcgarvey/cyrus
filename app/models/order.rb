class Order < ApplicationRecord
  has_many :coffee_orders

  after_initialize :init

  accepts_nested_attributes_for :coffee_orders

  def init
    self.name ||= ''
  end

  def as_json(*args)
    super.merge(coffee_orders: coffee_orders.map(&:as_json))
  end

  def self.from_params(params)
    Order.new(name: params[:name]).tap do |order|
      params[:coffee_orders].each do |index, coffee|
        order.coffee_orders.build(coffee)
      end
    end
  end

end

