class User < ActiveRecord::Base

  has_many :punches
  has_many :user_puncheds, through: :punches

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
