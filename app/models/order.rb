class Order < ApplicationRecord
  has_many :coffee_orders
  belongs_to :user

  after_initialize :init

  accepts_nested_attributes_for :coffee_orders

  def init
    self.name ||= ''
  end

  def as_json(*args)
    super.merge(coffee_orders: coffee_orders.map(&:as_json))
  end

  def amount
    1000
  end


end

