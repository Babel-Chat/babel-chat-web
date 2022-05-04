import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/styles.scss';

const LoginPage = (props) => {
  const {setState, state} = props;
  const navigate = useNavigate();
  // deconstruct props
  // const {isLoggedIn, user_id, language} = props.state;
  // login functionality
  const handleLogin = (e) => {
    e.preventDefault();
    const loginInfo = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    }

    axios.post('http://localhost:3000/login/', loginInfo)
      .then(data => {
        console.log(data.data);
        const newState = JSON.parse(JSON.stringify(state));
        newState.isLoggedIn = true;
        newState.user_id = data.data.user_id;
        newState.language = data.data.language;
        newState.chats = data.data.chats;
        newState.username = data.data.username;
        setState(newState);
        
        navigate('/main');
      })
      .catch(error => {
        console.log(error);
      });
    }
  return (
    <div id="login-page">
      <h1>International Chat</h1>
      <div className="login-container">
        <form id="login-inputs">
          <input id="username" type="text" placeholder="Username" required></input>
          <input id="password" type="password" placeholder="Password" required></input>
          <button id="login-sumbit" onClick={handleLogin}>Log In</button>
        </form>
      </div>
      <div id="sign-up-message">
        <p>Don't have an account yet?</p>
        <Link to="/signup">SignUp</Link>
      </div>
    </div>
  )
}

export default LoginPage;