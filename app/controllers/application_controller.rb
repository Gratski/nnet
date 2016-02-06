class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :logged_in?, :current_user, :validate_session

  #check if a current user is actually logged in
  def logged_in?
    session[:user_id] ? true : false
  end

  #get the logged in user
  def current_user
    User.find(session[:user_id])
  end

  #redirect if needed
  def validate_session
    if !logged_in?
      redirect_to root_path
    end
  end

end