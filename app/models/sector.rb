class Sector < ActiveRecord::Base
  has_many :sector_areas
  has_many :users
end