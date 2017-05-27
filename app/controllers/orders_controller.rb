class OrdersController < ApplicationController
  def new
    @options = options_for(CoffeeOrder, %i|bean coffee_temperature cream cream_temperature|)
    @order = Order.new
    @order.coffee_orders.build
  end

end
