Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :orders
  resources :payments
  resource :home, controller: 'home'
  root to: "home#show"

  resources :charges
end
