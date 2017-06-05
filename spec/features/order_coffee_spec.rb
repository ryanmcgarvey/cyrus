describe 'Order Coffee' do

  it "makes it through" do
    visit '/'
    click_button 'Medium'

    within provides('coffee_order', for: 0) do
      select_from_dropdown 'Turkey', from: 'bean'
      select_from_dropdown 'Hot', from: 'coffee_temperature'
      select_from_dropdown 'Soy', from: 'cream'
      select_from_dropdown 'Cold', from: 'cream_temperature'
    end

    click_button 'Large'

    within provides('coffee_order', for: 1) do
      select_from_dropdown 'Brazil', from: 'bean'
      select_from_dropdown 'Cold', from: 'coffee_temperature'
      select_from_dropdown 'Soy', from: 'cream'
    end

    click_button 'Next'

    fill_in 'name', with: 'Eleanor McGarvey'

    click_button 'Next'

    expect(page).to have_content "hot turkey with cold soy"
    expect(page).to have_content "cold brazil with soy"

    click_button 'Checkout'

    within_frame 'stripe_checkout_app' do
      fill_in 'Card number', with: '4242424242424242'
      fill_in 'MM / YY', with: '02/24'
      fill_in 'CVC', with: '123'
      click_button 'Money Please!'
    end

    wait_for do
      expect(page).to have_content 'Thank you for your order'
    end
  end

end
