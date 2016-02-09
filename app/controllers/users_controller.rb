class UsersController < ApplicationController

  before_action :validate_session, only: [:edit]
  skip_before_action :verify_authenticity_token

  def show
    @user = User.find(params[:id])
  end

  def edit
    @user = Useer.find(current_user.id)
  end

  #API
  #POST
  def password
    
    if current_user.authenticate(params[:password])
      if current_user.update(password: params[:new_password])
        render nothing:true, status: :accepted
      else
        render nothing:true, status: :not_acceptable
      end
    else
      render nothing:true, status: :unauthorized
    end

  end
end
