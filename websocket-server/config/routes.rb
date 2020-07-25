Rails.application.routes.draw do
  mount ActionCable.server => "/cable"
  resources :users, only: [:create, :]
  resources :messages
  post '/login', to: 'auth#create'
  get '/reauth', to: 'auth#re_auth'
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
