class CoffeeOrder < ApplicationRecord
  extend Enumerize
  BEANS = %w|brazil new_zealand zimbabwe indonesia turkey hawaii|
  TEMPERATURES = %w|cold hot|
  CREAMS = %w|black soy almond coconut skim one two whole half_and_half|

  belongs_to :order

  enumerize :bean, in: BEANS
  enumerize :coffee_temperature, in: TEMPERATURES
  enumerize :cream, in: CREAMS
  enumerize :cream_temperature, in: TEMPERATURES
end

