module Orders
  class WithStripe < Struct.new(:stripe_params, :order_params, :user)
    def execute!
      order = Order.new(
        name: order_params[:name],
        pickup_time: order_params[:pickup_time],
        user: user
      )

      if coffees = order_params[:coffee_orders]
        coffees.each do |index, coffee|
          order.coffee_orders.build(coffee)
        end
      end

      customer = Stripe::Customer.create(
        :email => stripe_params[:email],
        :source  => stripe_params[:id]
      )

      charge = Stripe::Charge.create(
        :customer    => customer.id,
        :amount      => order.amount,
        :description => 'Rails Stripe customer',
        :currency    => 'usd'
      )

      order.save!
    end
  end
end
