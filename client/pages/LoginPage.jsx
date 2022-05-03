import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const LoginPage = (props) => {
  // deconstruct props
  const {isLoggedIn, user_id, language} = props;
  // login functionality
  const handleLogin = (e) => {
    e.preventDefault();
    const loginInfo = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    }

    axios.post('/login', loginInfo)
      .then(function (response) {
        // deconstruct the response object and setState for client info
        // if isLoggedIn, redirect to mainPage or stay on the login page
        isLoggedIn ? <Redirect to="/main" /> : <Redirect to="/"/>
      })
      .catch(function(error){
        console.log(error);
      });
    }
  return (
    <div id="login-page">
      <div className="login-container">
        <form id="login-inputs">
          <input id="username" type="text" placeholder="Username" required></input>
          <input id="password" type="text" placeholder="Password" required></input>
          <button id="login-sumbit" type="submit" onSubmit={handleLogin}>Log In</button>
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