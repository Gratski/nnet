class User < ActiveRecord::Base

  has_many :punches

  #get this user conversations
  def conversations
    Conversation.where("user_1 = ? OR user_2 = ?", id, id)
  end

  def who_i_punched
    #FAZER GET PUNCHED USERS
  end
  
  def who_punched_me
    #FAZER GET WHO PUNCHED ME USERS
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

  #to hash the password
  has_secure_password

end
