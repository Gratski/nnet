class LocationsController < ApplicationController

  def countries
    @countries = Country.all()
    render json: @countries, status: :ok
  end

  def cities
    @cities = City.where(country_id: params[:country_id])
    render json: @cities, status: :ok
  end

end