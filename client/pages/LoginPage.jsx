import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/styles.scss';

const LoginPage = (props) => {
  const navigate = useNavigate();
  // deconstruct props
  const {isLoggedIn, user_id, language} = props;
  // login functionality
  const handleLogin = () => {
    
    const loginInfo = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    }

    axios.post('http://localhost:3000/login/', loginInfo)
      .then(res => res.json())
      .then(data => {
        // props.state.isLoggedIn = data.true;
        // props.state.user_id = data.user_id;
        // props.state.language = data.language;
        // props.state.chats = data.chats;

        navigate('/main');
      })
      .catch(error => {
        console.log(error);
      });
    }
  return (
    <div id="login-page">
      <div className="login-container">
        <form id="login-inputs">
          <input id="username" type="text" placeholder="Username" required></input>
          <input id="password" type="text" placeholder="Password" required></input>
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