require 'capybara/rspec'
# require 'capybara-screenshot/rspec'

Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome, :switches => %w[--disable-popup-blocking]).tap do |driver|
    driver.options[:prefs] =
      {
        credentials_enable_service: false,
        profile: { password_manager_enabled: false }
    }
  end
end

Capybara.javascript_driver = :selenium
Capybara.default_driver = :selenium


RSpec.configure do |config|
  config.include Capybara::DSL
end

module Capybara::Node
  class Element
    def click_hard
      begin
        trigger("click")
      rescue Capybara::NotSupportedByDriverError
        click
      end
    end
  end
end

module GeneralCapybaraMatchers

  def wait_for(tries: 4, on_error: nil, pry: false, &block)
    count = 1
    while true
      begin
        block.call
        return
      rescue RSpec::Expectations::ExpectationNotMetError, Capybara::ElementNotFound => e
        if count >= tries
          binding.pry if pry
          raise e
        else
          puts "Failed attempt #{count} inside wait for."
          count +=1
          if on_error
            on_error.call
          end
          sleep 1
        end
      end

    end
  end

  def refresh_until(pry: false, &block)
    on_error = Proc.new do
      puts "reloading"
      binding.pry if pry
      reload_page
    end
    wait_for(on_error: on_error) do
      block.call
    end
  end


  def select_from_dropdown(item_text, options)
    # find dropdown selector
    dropdown = find(%|[name="#{options[:from]}"]|, visible: false).first(:xpath,".//..")
    # click on dropdown
    dropdown.click
    # click on menu item
    dropdown.find(".menu .item", :text => item_text).click
  end


  def label_for(label_for, options = {})
    page.find %|label[data-for="#{label_for}"]|, options
  end

  def provides(name, options = {})
    if provides_for = options.delete(:for)
      page.find %|[data-provides="#{name}"][data-for="#{provides_for}"]|, options
    else
      page.find %|[data-provides="#{name}"]|, options
    end
  end

  def all_provides(name, options = {})
    if provides_for = options.delete(:for)
      page.all %|[data-provides="#{name}"][data-for="#{provides_for}"]|, options
    else
      page.all %|[data-provides="#{name}"]|, options
    end
  end

  def provides?(name, options = {})
    if provides_for = options.delete(:for)
      page.all(%|[data-provides="#{name}"][data-for="#{provides_for}"]|, options).count > 0
    else
      page.all(%|[data-provides="#{name}"]|, options).count > 0
    end
  end
end

