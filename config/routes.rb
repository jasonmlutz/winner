Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :surveys, only: [:index, :show, :create, :destroy]
    end
  end
  root 'app#index'

  get '*path', to: 'app#index'
end
