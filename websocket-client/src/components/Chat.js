import React, { Component } from 'react';

class Chat extends Component {
  state = {
    messages: [],
    content: "",
    users: []
  }

  componentDidMount() {
    this.updateMessages();
    this.fetchAllUsers();
  }

  fetchAllUsers = () => {
    fetch('http://localhost:3000/users', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(resp => resp.json())
    .then(users => {
      this.setState({
        users: users
      })
    })
  }

  componentWillUnmount() {
    let message = {
      command: "unsubscribe",
      identifier: JSON.stringify({ channel: "MessageChannel" })
    }
    this.socketClient.send(JSON.stringify(message))
  }
  
  socketClient = new WebSocket(`ws://localhost:3000/cable?token=${localStorage.getItem('jwt')}`);
  
 
 
   // create new websocket connection
    updateMessages = () => {
      
      console.log(this.socketClient)
      this.socketClient.onopen = (e) => {
        let message = {
          command: "subscribe",
          identifier: JSON.stringify({ channel: "MessageChannel" })
        }
        console.log('open')
        this.socketClient.send(JSON.stringify(message));
      }

      this.socketClient.onmessage = (e) => {
        const serverResponse = JSON.parse(e.data)
        if (serverResponse.type === "ping") return;
        console.log(new Date().getTime(), serverResponse)
        const data = serverResponse.message
        if (data && data.type === "messages") {
          return this.setState({
            messages: data.messages
          })
        } 
      
        if (data && data.type === "new_message") {
          if (!this.state.messages.includes(data.message)) {
            this.setState(prevState => ({
              ...prevState,
              messages: [...prevState.messages, data.message]
            }))
          }
        }
      }
  }


  createMessage = (e) => {
    e.preventDefault()
   
    fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ 
        message: {
          content: this.state.content,
          receiver_id: parseInt(e.target[1].value),
          sender_id: this.props.currentUser.id
        }
      })
    })

    this.setState({
      content: ""
    })
  }

  render() {
    const { messages, content, users } = this.state
    console.log(messages)
    return (
      <div className='messages'>
        {messages.map(m => <h4 key={m.id}>{m.content}</h4>)}
        <form action="" onSubmit={(e) => this.createMessage(e)} >
          <label htmlFor="content" />
          <input 
            type="text" 
            name="content" 
            onChange={(e) => this.setState({content: e.target.value})} 
            value={content}
          />
          <select>
            { users.map(u => <option key={u.id} value={u.id}>{u.name}</option>) }
          </select>
          <input type="submit" value="Send"/>
        </form>
      </div>
  )
  }
 
}


export default Chat;
