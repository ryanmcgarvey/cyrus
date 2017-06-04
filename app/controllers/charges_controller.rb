class ChargesController < ActionController::API
  def create
    # Amount in cents
    @amount = 500

    stripe = params[:stripe]

    customer = Stripe::Customer.create(
      :email => stripe[:email],
      :source  => stripe[:id]
    )

    charge = Stripe::Charge.create(
      :customer    => customer.id,
      :amount      => @amount,
      :description => 'Rails Stripe customer',
      :currency    => 'usd'
    )

    order_params = params.require(:order).permit(
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

    Order.from_params(order_params).save!
  end
end
