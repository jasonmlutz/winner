Rails.application.routes.draw do
  namespace :api do
    resources :surveys, only: [:index, :show, :create, :destroy, :update] do
      resources :questions, only: [:create, :index]
      resources :response_options, only: [:index]
    end

    resources :questions, only: [:update, :destroy] do
      resources :response_options, only: [:create, :index]
    end

    resources :response_options, only: [:update, :destroy]

    resources :users, only: [:index, :create, :show, :destroy] do
      resources :surveys, only: [:index]
    end

    resource :session, only: [:create, :show, :destroy]

    resources :responses, only: [:show, :create, :destroy] do
      resources :answers, only: [:create, :index]
    end
  end

  root 'app#index'

  get '*path', to: 'app#index'
end
