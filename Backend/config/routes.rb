Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

# Defines the root path route ("/")
# root "posts#index"

post "/signup", to: "auth#signup"
post "/signin", to: "auth#signin"

patch "/edit_profile", to: "users#update"
get "/edit_profile", to: "users#show"


resources :goals, only: [ :create, :index]


resources :meals do
  resources :meal_items, only: [ :create, :index ]
  collection do
    get :today
  end
end
delete "/meal_items/:id", to: "meal_items#destroy"

resources :workouts, only: [ :create, :index ]
end
