class WelcomeController < ApplicationController

  skip_before_action :validate_session

  def index
  end

end
