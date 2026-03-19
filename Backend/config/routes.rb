Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

post "/signup", to: "auth#signup"
post "/signin", to: "auth#signin"

post "/goals", to: "goals#create"
get "/goals", to: "goals#show"

resources :meals do
  resources :meal_items, only: [:create, :index]
end

resources :workouts, only: [:create, :index]

delete "/meal_items/:id", to: "meal_items#destroy"


end

