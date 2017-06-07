Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  namespace :admin do
    resources :orders
  end

  namespace :customer do
    resources :orders
  end

  resources :orders do
    get 'reorder'
  end
  root to: "orders#new"
end
