class HomeController < ApplicationController
  def show
    options = options_for(CoffeeOrder, %i|bean coffee_temperature cream cream_temperature size|)
    @config = {
      charges_url: charges_path,
      stripe_api_key: Rails.configuration.stripe[:publishable_key],
      options: options
    }
  end
end
