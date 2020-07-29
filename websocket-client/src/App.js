import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Chat from './components/Chat'
import './App.css';

 class App extends Component {
  state = {
    currentUser: null
  }

  componentDidMount() {
    this.reAuth()
  }


  reAuth = () => {
    if (localStorage.getItem('jwt')){
      return fetch('http://localhost:3000/reauth', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Accept': 'application/json'
        }
      })
      .then(resp => resp.json())
      .then(data => {
        this.setUser(data.user)
      })
      .catch(console.log())
    }
  }

  setUser = (user) => {
    this.setState({
      currentUser: user
    })
  }

  handleSignOut = () => {
    this.setState({
      currentUser: null
    })
    localStorage.clear()
  }

  render() {
    const {currentUser} = this.state;
    
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                  return (
                    localStorage.getItem('jwt') ?
                    <Redirect to="/chat" /> :
                    <Redirect to="/login" /> 
                  )
                }}
            />
            <Route path='/login' render={(props) => <Login {...props} setUser={this.setUser}/>} />
            <Route path='/signup' render={(props) => <Signup {...props} setUser={this.setUser} />} />

            { currentUser !== null ?
            <>
              <Route path='/chat' render={() => <Chat currentUser={currentUser} /> } />
              <Link to='/login'><button onClick={this.handleSignOut}>Sign Out</button></Link>
            </>
            :
            <>
              <h1>Must Login To View this page</h1>
            </>
            }
            
          </Switch>
        </Router>
      </div>
    )
  }
 
}

export default App;
