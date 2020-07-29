import React, { useState } from 'react'


function Signup({setUser, history}) {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [email, setEmail] = useState("")
  

  const getUser = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ 
        user: {
          name,
          username,
          email,
          password, 
          password_confirmation: passwordConfirmation
        }
      })
    })
      .then(res => res.json())
      .then(data => {
        setUser(data.user)
        localStorage.setItem('jwt', data.jwt) 
        history.push('/chat')
      })
      .catch(error => console.log(error))
        // document.getElementById('loginError').innerText = error)
  }

  return (
    <>
      <p id="loginError"></p>
      <form action="" onSubmit={getUser} >
        <label htmlFor="name" />
        <input 
          type="text" 
          name="name" 
          placeholder="name"
          onChange={(e) => setName(e.target.value)} 
          value={name}
        />
        <label htmlFor="username" />
        <input 
          type="text" 
          name="username" 
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)} 
          value={username}
        />
        <label htmlFor="email" />
        <input 
          type="text" 
          name="email"
          placeholder="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
        />
        <label htmlFor="password" />
        <input 
          type="password" 
          name="password" 
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
        />
        <label htmlFor="passwordConfirmation" />
        <input 
          type="password" 
          name="passwordConfirmation" 
          placeholder="confirm password"
          onChange={(e) => setPasswordConfirmation(e.target.value)} 
          value={passwordConfirmation}
        />
        <input type="submit" value="Sign Up"/>
      </form>
    </>
  )
}

export default Signup;