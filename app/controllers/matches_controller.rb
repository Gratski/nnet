class MatchesController < ApplicationController

  before_action :validate_session

  def index
    @matches = User.where("id != #{current_user.id}").order("id DESC").paginate(page: params[:page], per_page: 1)
  end

  def get_matches
    offset = params[:offset].to_i
    limit  = params[:limit].to_i
    @users = User.where("id != #{current_user.id}").order("id DESC").offset(offset).limit(limit)
    @users_list = @users.map do |user|
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
    render json: @users_list, status: :ok
  end

end
