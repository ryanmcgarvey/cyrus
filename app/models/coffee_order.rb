class CoffeeOrder < ApplicationRecord
  BEANS = %w|brazil new_zealand zimbabwe indonesia turkey hawaii|
  TEMPERATURES = %w|cold hot|
  CREAMS = %w|black soy almond coconut skim one two whole half_and_half|
  SIZES = %w|small medium large|

  extend Enumerize
  enumerize :bean, in: BEANS
  enumerize :coffee_temperature, in: TEMPERATURES
  enumerize :cream, in: CREAMS
  enumerize :cream_temperature, in: TEMPERATURES
  enumerize :size, in: SIZES

  belongs_to :order

  def for_table
    "#{size.try(:text)} #{coffee_temperature.try(:text)} #{bean.try(:text)} #{cream_temperature.try(:text)} #{cream.try(:text)}"
  end
end

