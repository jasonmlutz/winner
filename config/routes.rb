Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :surveys, only: [:index, :show, :create, :destroy, :update] do
        resources :questions, only: [:create, :index]
      end
    end
  end
  root 'app#index'

  get '*path', to: 'app#index'
end
