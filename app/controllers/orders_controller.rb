class OrdersController < ApplicationController
  def new
    options = options_for(CoffeeOrder, %i|bean coffee_temperature cream cream_temperature size|)
    @config = {
      charges_url: charges_path,
      stripe_api_key: Rails.configuration.stripe[:publishable_key],
      options: options
    }
  end

  def index
    @orders = Order.all.order('pickup_time desc').where('pickup_time is not null')
  end

  def destroy
    Order.find(params[:id]).destroy
    redirect_to orders_path
  end
end


