class OrdersController < ApplicationController

  def new
    @config = generate_config
    @order = {
      name: current_user.try(:pickup_name),
      coffee_orders: [ ]
    }
  end

  def reorder
    order = Order.find(params[:order_id])
    @order = order.as_json
    @config = generate_config
    render 'new'
  end

  def create
    stripe_params = params.require(:stripe).permit!
    order_params  = params.require(:order).permit(
      :name,
      :pickup_time,
      coffee_orders: [
        :bean,
        :coffee_temperature,
        :cream,
        :cream_temperature,
        :size,
        :notes
      ]
    )

    Orders::WithStripe.new(stripe_params, order_params, current_user).execute!
  end

  private

  def options
    options_for(
      CoffeeOrder,
      %i|bean coffee_temperature cream cream_temperature size|
    )
  end

  def generate_config
    {
      orders_url: orders_path,
      stripe_api_key: Rails.configuration.stripe[:publishable_key],
      options: options,
      user_info: current_user.try(:data) || {},
    }
  end

end


