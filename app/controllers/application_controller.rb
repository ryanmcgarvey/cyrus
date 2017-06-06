class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception, prepend: true


  def options_for(klass, methods)
    {}.tap do |options|
      methods.each do |m|
        options[m] = klass.send(m).options.map do |text, value|
          { text: text, value: value }
        end
      end
    end
  end

end
