class SectorsController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :validate_session

  #API
  #GET
  def all
    @sectors = Sector.all.order("name ASC")
    render json: @sectors, status: :ok
  end
  def areas
    @sector_areas = SectorArea.where(sector_id: params[:id])
    render json: @sector_areas, status: :ok
  end
end