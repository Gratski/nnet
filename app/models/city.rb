class City < ActiveRecord::Base
  belongs_to :country
  has_many :user_cities
  has_many :users, through: :user_cities
  has_many :searches
end
