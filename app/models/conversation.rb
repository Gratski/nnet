class Conversation < ActiveRecord::Base
  has_many :messages

  def self.find_conversation_between(user_1, user_2)
    Conversation.where("user_1 = ? AND user_2 = ? OR user_1 = ? AND user_2 = ?", user_1, user_2, user_2, user_1).first
  end

end
