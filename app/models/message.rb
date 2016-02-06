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

end
