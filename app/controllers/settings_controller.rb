class SettingsController < ApplicationController
  def index
    @user = current_user
  end

  def password
    @user = current_user
  end

  def profession
    @user = current_user
  end
end