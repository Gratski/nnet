class Sector < ActiveRecord::Base
  has_many :user_sectors
  has_many :users
end