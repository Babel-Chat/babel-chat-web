import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

const SignupPage = (props) => {

  const submitHandler = (e) => {
    e.preventDefault();

    const signUpInfo = {
      username: document.getElementById('signup-username').value,
      email: document.getElementById('email').value,
      password: document.getElementById('signup-password').value,
      language: document.getElementById('selectLanguage').value
    };

    axios.post('/signup', signUpInfo)
      .then(function (response) {
        console.log(response);
      })
      .catch(function(error){
        console.log(error);
      });

      // redirect
  }

  return (
    <div> 
    <h1>Sign Up</h1>
      <div>
        <form id="signup-input">
          <input id="signup-username" placeholder="Username"></input>
          <input id="email" placeholder="E-mail" ></input>
          <input id="signup-password" placeholder="Password" ></input>
          <div>
            <label>Select your Language</label>
              <select id="selectLanguage">
                <option value="none" selected disabled hidden>Language</option>
                <option value="en">English</option>
                <option value="ko">Korean</option>
                <option value="es">Spanish</option>
              </select>
          </div>
          <Link to='/' >
            <button id="signup-submit" type="submit" onSubmit={submitHandler}>Sign Up</button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default SignupPage;