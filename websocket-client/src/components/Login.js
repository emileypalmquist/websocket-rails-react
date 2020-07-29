import React, { useState } from 'react'

function Login({setUser, history}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const getUser = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({user: { username, password}})
    })
      .then(res => res.json())
      .then(data => {
        if (data.user){
          setUser(data.user)
          localStorage.setItem('jwt', data.jwt)
          history.push('/chat')
        } else {
          document.getElementById('loginError').innerText = data.message
        }
      })
      .catch(console.log())
  }

  return (
    <form action="" onSubmit={getUser} >
      <p id='loginError'></p>
      <label htmlFor="username" />
      <input 
        type="text" 
        name="username" 
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)} 
        value={username}
      />
      <label htmlFor="password" />
      <input 
        type="password" 
        name="password" 
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)} 
        value={password}
      />
      <input type="submit" value="Log In"/>
    </form>
  )
}

export default Login;