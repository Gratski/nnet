class SessionsController < ApplicationController

  #skip_before_action :validate_session, only: [:create]
  skip_before_action :verify_authenticity_token

  #POST
  def new
    @user = User.new(params.require(:sign_up).permit(:name, :email, :password))
    @user.available_punches = 10;
    if @user.save
      Detail.create(user_id: @user.id)
      Search.create(user_id: @user.id)
      render nothing:true, status: :accepted
    else
      render nothing:true, status: :bad_request
    end

  end

  #POST
  def create
    @user = User.where(:email => params[:login][:email]).first
    if @user
      if @user.authenticate(params[:login][:password])
        #create session
        session[:user_id] = @user.id
        render json: @user, status: :created
      else
        render nothing:true, status: :bad_request
      end

    else
      render nothing:true, status: :bad_request
    end
  end

  #POST
  def destroy
    if logged_in?
      session[:user_id] = nil
      render nothing:true, status: :accepted
    else
      render nothing:true, status: :forbidden
    end
  end

  def validate
    logged_in? ? (render nothing:true, status: :ok) : (render nothing:true, status: :forbidden)
  end

  private
  def login_params
    params.require(:login).permit(:email, :password)
  end

end
