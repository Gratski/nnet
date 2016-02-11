class Search < ActiveRecord::Base
  belongs_to :country
  belongs_to :city
  belongs_to :user
end
