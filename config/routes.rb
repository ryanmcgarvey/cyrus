Rails.application.routes.draw do
  resources :orders
  root to: "orders#new"
  resources :charges
end
