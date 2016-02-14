class UsersController < ApplicationController

  before_action :validate_session, only: [:edit]
  skip_before_action :verify_authenticity_token

  def show
    @current_user = current_user
    @user = User.find(params[:id])
    @pictures = @user.pictures
  end

  def edit
    @user = Useer.find(current_user.id)
  end

  #API
  #--- PUT
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
  def sector_area
    @user = current_user
    @details = @user.detail
    @details.sector_area_id = params[:sector_area_id].to_i
    if @details.save
      render nothing:true, status: :ok
    else
      render nothing:true, status: :not_acceptable
    end
  end
end
