class UsersController < ApplicationController

  before_action :validate_session, only: [:edit]

  def show
    @user = User.find(params[:id])
  end

  def edit
    @user = Useer.find(current_user.id)
  end
end
