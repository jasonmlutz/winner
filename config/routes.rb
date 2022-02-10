Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :surveys
    end
  end
  root 'app#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
