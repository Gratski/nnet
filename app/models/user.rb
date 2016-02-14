class User < ActiveRecord::Base

  has_many :punches
  has_many :user_puncheds, through: :punches

  has_many :messages

  has_many :topics
  has_one :detail
  has_many :interests

  has_many :user_sectors
  has_many :sectors, through: :user_sectors

  has_many :deleted_conversations

  has_one :search

  has_many :pictures

  #get this user conversations
  def conversations
    Conversation.where("user_1 = ? OR user_2 = ?", id, id)
  end
  
  #see who punched a certain user
  def who_punched_me(offset, limit)
    punches = Punch.where("user_punched_id = ?", id)
    punchers = Array.new(punches.length)
    punches.each do |punch|
      punchers << punch.user_id
    end
    User.where(:id => punchers)
  end
  
  def friends_with?(user_id)
    already_punched_me(user_id) and already_punched?(user_id)
  end

  #verifica se um user ja fez punch
  def already_punched?(user_id)
    punch = Punch.where(user_id: id, user_punched: user_id)
    punch.size > 0 ? true : false
  end

  #verfica se um user pode fazer punch back
  def is_a_punch_back?(user_id)
    punch = Punch.where(user_id: user_id, user_punched: id)
    punch.size > 0 ? true : false
  end

  def already_punched_me(user_id)
    user = Punch.where(user_id: user_id, user_punched_id: id).first
    if user
      return true
    else 
      return false
    end
  end

  def friends_with?(user_id)
    if already_punched?(user_id) and already_punched_me(user_id)
      return true
    else
      return false
    end
  end

  def city
    City.where(id: city_id).first
  end

  def country
    Country.where(id: country_id).first
  end

  #to hash the password
  has_secure_password

end
