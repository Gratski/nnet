class PunchesController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :validate_session

  #GET
  def index
  end

  #API---------------------------------------------------------------------------
  #GET
  def my_punches
    offset = params[:offset]
    limit = params[:limit]
    query = "select P.id as punch, U.id as user_id, U.name from users U, punches P "
    query = query + "where P.user_punched_id = U.id AND P.user_id = #{current_user.id} "
    query = query + "AND NOT EXISTS ("
    query = query + " select P2.id from punches P2 where P2.user_id = U.id AND P2.user_punched_id = #{current_user.id}"
    query = query + ")"
    results = ActiveRecord::Base.connection.execute(query)
    render json: results, status: :ok
  end

  def punched_me
    offset = params[:offset]
    limit = params[:limit]
    query = "select P.id as punch, U.id as user_id, U.name from users U, punches P "
    query = query + "where P.user_punched_id = #{current_user.id} AND P.user_id = U.id "
    query = query + "AND NOT EXISTS ("
    query = query + " select P2.id from punches P2 where P2.user_id = #{current_user.id} AND P2.user_punched_id = U.id"
    query = query + ")"
    results = ActiveRecord::Base.connection.execute(query)
    render json: results, status: :ok
  end

  #POST
  def punch
    user = User.find(params[:id])
    #test if user has some punch left
    if user.available_punches == 0
      render nothing:true, status: :not_acceptable
    end


    if user
      punch = Punch.new(user_id: current_user.id, user_punched_id: params[:id])
      if punch.save
        user.available_punches = user.available_punches - 1
        user.save
        render nothing:true, status: :created
      else
        render nothing:true, status: :bad_request
      end
    else
      render nothing:true, status: :conflict
    end
  end

  def unpunch
    punch = Punch.where(user_id: current_user.id, user_punched_id: params[:user_id]).first
    if punch
      punch.destroy
      render nothing:true, status: :ok
    else
      render nothing:true, status: :bad_request
    end
  end

end