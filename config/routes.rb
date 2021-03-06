Rails.application.routes.draw do

  root 'welcome#index'

  #USERS
  resources :users
  get 'users/edit' => 'users#edit'
  put '/api/users/password' => 'users#password' #change to PUT
  put '/api/users/sector_area' => 'users#sector_area'

  #MESSAGES
  resources :messages
  get '/api/messages'  => 'messages#get_conversations'
  get '/api/messages/:id/:offset/:limit' => 'messages#get_messages'
  post '/api/messages' => 'messages#create'
  delete '/api/messages/:id' => 'messages#destroy'

  #SECTORS
  get '/api/sectors' => 'sectors#all'
  get '/api/sector_areas/:id' => 'sectors#areas'

  #SESSIONS
  post 'api/sessions/new'      => 'sessions#new'
  post 'api/sessions/create'   => 'sessions#create'
  post 'api/sessions/destroy'  => 'sessions#destroy'
  post 'api/sessions/validate' => 'sessions#validate'

  #MATCHES
  get 'matches' => 'matches#index'
  get '/api/matches/:offset/:limit' => 'matches#get_matches'

  #LOCATIONS
  get '/api/locations/country' => 'locations#countries'
  get '/api/locations/country/:country_id' => 'locations#cities'

  #PUNCHES
  get   'punches'    => 'punches#index'
  post  '/api/punch' => 'punches#punch'
  get   '/api/punches/:offset/:limit' => 'punches#my_punches'
  get   '/api/punched/:offset/:limit' => 'punches#punched_me'
  delete  '/api/punch/:user_id' => 'punches#unpunch'

  #MESSAGES
  get 'messages' => 'messages#index'
  get 'messages/:id' => 'messages#show'

  #SETTINGS
  get 'settings' => 'settings#index'
  get 'settings/password' => 'settings#password'
  get 'settings/profession' => 'settings#profession'

  #SEARCH
  get '/api/search/count' => 'searches#count'
  get '/api/search/params' => 'searches#get_search_params'
  get '/api/search/:offset/:limit' => 'searches#get'
  put '/api/search' => 'searches#update'


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
