class PunchesController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :validate_session

  #POST
  def punch
    user = User.find(params[:id])
    if user
      punch = Punch.new(user_id: current_user.id, user_punched_id: params[:id])
      if punch.save
        render nothing:true, status: :created
      else
        render nothing:true, status: :not_acceptable
      end
    else
      render nothing:true, status: :conflict
    end
  end

end