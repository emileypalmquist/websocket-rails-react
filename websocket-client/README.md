//class MessageChannel < ApplicationCable::Channel
// def subscribed
// stream_from "message_channel"

// ActionCable.server.broadcast("message_channel", type: "messages", message_history: Message.all)
// end

// def send_message(data)
// new_message = Message.create(content: data["content"])

// ActionCable.server.broadcast("message_channel", type: "new_message", message: new_message)
// end
// end