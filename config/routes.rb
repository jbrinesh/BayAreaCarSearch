Rails.application.routes.draw do
  root to: "static_page#index"

  resources :users, only: [:new, :create]

  resource :session, only: [:new, :create, :destroy]

  namespace :api, default: { format: 'json'} do
    get 'classified/account', :to => 'classified#account_index'
    resources :classified, only: [:index]
  end

end
