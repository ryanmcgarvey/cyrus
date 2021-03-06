require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Coffee
  class Application < Rails::Application
    config.load_defaults 5.1
    config.google_client_id = ENV['GOOGLE_CLIENT_ID']
    config.autoload_paths << Rails.root.join('app/components')
  end
end
