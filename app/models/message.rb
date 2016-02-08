class Message < ActiveRecord::Base

  belongs_to :conversation
  belongs_to :user

  def self.messages_by_conversation_between(offset, limit, user_id, friend_id)
    @conversation = Conversation.find_conversation_between(user_id, friend_id)
    if @conversation
      puts "conversation id: #{@conversation.id}"
      Message.where(conversation_id: @conversation.id)
    else
      Array.new
    end
  end

  def get_other_user(user_id)
    msg = Message.find(id)
    if msg.conversation.user_1 == user_id
      return User.find(msg.conversation.user_2)
    else
      return User.find(msg.conversation.user_1)
    end
  end

  def get_user
    msg = Message.find(id)
    user = User.find(msg.user_id)
  end

end
