import React, { Component } from 'react';
import './App.css';


let socketClient = new WebSocket("ws://localhost:3000/cable");

 class App extends Component {
  state = {
    messages: [],
    content: ""
  }


  componentDidMount() {
    //create new websocket connection
    socketClient.onopen = (e) => {
      let message = {
        command: "subscribe",
        identifier: JSON.stringify({ channel: "MessageChannel"})
      }

      socketClient.send(JSON.stringify(message));
    }

    socketClient.onmessage = (e) => {
      const serverResponse = JSON.parse(e.data)

      if (serverResponse.type === "ping") return;

      const data = serverResponse.message
      if (data && data.type === "messages") {
        this.setState({
          messages: data.message_history
        })
      } 
      
      if (data && data.type === "new_message") {
        this.setState(prevState => ({
          ...prevState,
          messages: [...prevState.messages, data.message]
        }))
      }
    }
  }


  createMessage = (e) => {
    e.preventDefault()

    const message = {
      command: "message",
      identifier: JSON.stringify({ channel: "MessageChannel"}),
      data: JSON.stringify({ action: "send_message", content: this.state.content})
    }

    socketClient.send(JSON.stringify(message))
    this.setState({
      content: ""
    })
  }

  render() {
    const {messages, content} = this.state
    return (
      <div className="App">
        {messages.map(m => <h4 key={m.id}>{m.content}</h4>)}
        <form action="" onSubmit={this.createMessage} >
          <label htmlFor="content" />
          <input 
            type="text" 
            name="content" 
            onChange={(e) => this.setState({content: e.target.value})} 
            value={content}
          />
          <input type="submit" value="Send"/>
        </form>
      </div>
    )
  }
 
}

export default App;
