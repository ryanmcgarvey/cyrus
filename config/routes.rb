Rails.application.routes.draw do
  resource :home, controller: 'home'
  root to: "home#show"
  resources :charges
end
