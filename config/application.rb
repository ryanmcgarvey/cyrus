require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Coffee
  class Application < Rails::Application
    config.load_defaults 5.1
    config.google_client_id = ENV['GOOGLE_OAUTH_CLIENT_ID']
  end
end
