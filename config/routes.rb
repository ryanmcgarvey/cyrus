Rails.application.routes.draw do
  devise_for :users
  resources :orders
  root to: "orders#new"
  resources :charges
end
