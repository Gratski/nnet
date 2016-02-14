class SearchesController < ApplicationController

  before_action :validate_session
  skip_before_action :verify_authenticity_token

  #GET
  def get
    query = obtain_query
    @matches = User.where(query).order("id DESC").offset(params[:offset].to_i).limit(params[:limit].to_i)
    @matches_list = @matches.map do |user|
        # se ja sao amigos
      if current_user.friends_with?(user.id)
        {user: user, friends: true}
        # se o user ja lhe fez punch
      elsif current_user.already_punched?(user.id)
        {user: user, punched: true}
        # se o user user ja lhe fez punch  e eh um punch back
      elsif current_user.already_punched_me(user.id)
        {user: user, punched_me: true}
        # se ainda nao houve actions entre os dois
      else
        {user: user, fresh:true}
      end
    end
    render json: @matches_list, status: :ok
  end

  def count
    query = obtain_query
    @matches = User.where(query).count
    render json: @matches, status: :ok
  end

  def get_search_params
    @search = current_user.search
    @result = {}
    @result[:country] = @search.country
    @result[:city] = @search.city
    @result[:min_age] = @search.min_age
    @result[:max_age] = @search.max_age
    @result[:looking_for] = @search.looking_for
    render json: @result, status: :ok
  end

  #PUT
  def update
    @user = current_user
    @search = @user.search
    @search.min_age = params[:min_age].to_i if params[:min_age] && !params[:min_age].blank?
    @search.max_age = params[:max_age].to_i if params[:max_age] && !params[:max_age].blank?
    @search.country_id = params[:country_id].to_i if params[:country_id] && !params[:country_id].blank?
    @search.city_id = params[:city_id].to_i if params[:city_id] && !params[:city_id].blank?
    @search.looking_for = params[:looking_for] if params[:looking_for] && !params[:looking_for].blank?
    if @search.save
      render "matches/index"
    else
      render nothing:true, status: :bad_request
    end
  end

  private
  def obtain_query
    @search = current_user.search

    query = "id != #{current_user.id}"

    if @search.country_id
      query = query + " AND country_id = #{@search.country_id}"
    end
    if @search.city_id
      query = query + " AND city_id = #{@search.city_id}"
    end
    if @search.looking_for
      query = query + " AND gender = '#{@search.looking_for}'"
    end
    return query
  end

end