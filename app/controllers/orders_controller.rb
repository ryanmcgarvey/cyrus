class OrdersController < ActionController::API
  def create
    params.require(:order).permit!

    if Order.create(params[:order])
      head :ok
    else
      head 422
    end

  end
end
