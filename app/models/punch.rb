class Punch < ActiveRecord::Base
  belongs_to :user
  belongs_to :user_punched, :class_name => 'User'
end
