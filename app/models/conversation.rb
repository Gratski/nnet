class Conversation < ActiveRecord::Base
  has_many :messages, :dependent => :destroy
  has_many :deleted_conversations, :dependent => :destroy

  def self.find_conversation_between(user_1, user_2)
    Conversation.where("user_1 = ? AND user_2 = ? OR user_1 = ? AND user_2 = ?", user_1, user_2, user_2, user_1).first
  end

  def get_other_user(user_id)
    if user_1 == user_id
      return User.find(user_2)
    else
      return User.find(user_1)
    end
  end

  def mark_deleted_by_user(user_id)
    if user_1 == user_id
      deleted_by_user_1 = true
    else
      deleted_by_user_2 = true
    end
    #save
    if save
      render nothing:true, status: :ok
    else
      render nothing:true, status: :bad_request
    end
  end

end
