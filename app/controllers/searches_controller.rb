class SearchesController < ApplicationController

  before_action :validate_session
  skip_before_action :verify_authenticity_token

  #GET
  def get
    @user = User.find(current_user.id)
    @search = @user.search

    @matches = User.where("id != ?", current_user.id)
                  .where(:country_id => @search.country_id) if @search.country_id
                  .where(:city_id => @search.city_id) if @search.city_id

    
    render json: @matches, status: :ok

  end

end