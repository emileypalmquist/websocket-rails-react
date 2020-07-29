class MessageChannel < ApplicationCable::Channel
  def subscribed
    # only authenticated users will have a stream opened
    stream_for current_user

    # broadcast all of the current_user's/authenticated user's messages 
    MessageChannel.broadcast_to(current_user, type: "messages", messages: current_user.messages)
  end

  def unsubscribed
    # clean up/stop streams for current_user
    stop_all_streams
  end

end