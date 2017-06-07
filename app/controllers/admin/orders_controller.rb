module Admin
  class OrdersController < ApplicationController
    before_action :authenticate_user!

    def index
      @orders = Order.all.order('pickup_time desc').where('pickup_time is not null')
    end

    def destroy
      Order.find(params[:id]).destroy
      redirect_to admin_orders_path
    end
  end
end
