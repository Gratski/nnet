class MessagesController < ApplicationController

  skip_before_action :verify_authenticity_token
  before_action :validate_session

  def index
    sql = "SELECT * FROM conversations C, deleted_conversations DC WHERE C.id != DC.conversation_id AND DC.user_id != #{current_user.id}"
    @conversations = records_array = ActiveRecord::Base.connection.execute(sql)
    
    @user = current_user
  end

  def show
    @user = current_user
    @conversation = Conversation.find(params[:id])
    @messages = @conversation.messages.order("id DESC").limit(10)
    @messages = @messages.reverse
    @other_user = @conversation.get_other_user(@user.id)
  end

  #POST
  def create
    #se passada a conversation
    if params[:conversation_id]
      conversation_id = params[:conversation_id]
    else
      conversation = Conversation.where("user_1 = #{current_user.id} AND user_2 = #{params[:user_id]} OR user_1 = #{params[:user_id]} AND user_2 = #{current_user.id}").first
      #se a conversation ja existe
      if conversation
        conversation_id = conversation.id
      #se nao existe criar uma nova
      else
        conversation = Conversation.create(user_1: current_user.id, user_2: params[:user_id])
        conversation_id = conversation.id
      end
    end
    user_id = current_user.id
    body = params[:body]
    message = Message.new(conversation_id: conversation_id, user_id: user_id, body: body )
    if message.save
      render nothing: true, status: :created
    else
      render nothing: true, status: :bad_request
    end
  end

  #DELETE
  def destroy
    @deleted = DeletedConversation.new(user_id: current_user.id, conversation_id: params[:id])
    puts "TOOOOOO"
    puts params[:id]
    #save
    if @deleted.save
      @deleted_num = DeletedConversation.where(conversation_id: params[:id]).size
      if @deleted_num == 2
        conversation = Conversation.find(params[:id])
        conversation.destroy
      end
      render nothing:true, status: :ok
    else
      render nothing: true, status: :bad_request
    end
  end



  def get_conversations
    offset = params[:offset]
    limit = params[:limit]
    conversations = Conversation.where("user_1 = ? OR user_2 = ?", current_user.id, current_user.id)

    chats = conversations.map do |c|
      if c.deleted_conversations.where(conversation_id: c.id, user_id: current_user.id).count == 0
        msg = c.messages.last
        user = c.get_other_user(current_user.id)
        {:conversation_id => c.id, :friend => user, :message => msg }
      end
    end
    chats = chats.compact
    render json: chats, status: :ok
  end

  def get_messages
    msgs = Message.joins(:user).where(conversation_id: params[:id]).offset(params[:offset].to_i).order("id DESC")
    if msgs.size > 0
      user = msgs.first.get_other_user(current_user.id)
      render json: {:msgs => msgs, :user => user}, status: :ok
    else
      render json: {:msgs => msgs}, status: :ok
    end
  end

end
