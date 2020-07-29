class MessagesController < ApplicationController

  def create
    receiver = User.find(params['message']['receiver_id'])
    current_user = User.find(params['message']['sender_id'])

    new_message = Message.create(message_params)

    if new_message.valid?
      MessageChannel.broadcast_to(current_user, type: "new_message", message: new_message)
      if current_user != receiver 
        MessageChannel.broadcast_to(receiver, type: "new_message", message: new_message)
      end
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :sender_id, :receiver_id)
  end
end
