import React, { Component } from 'react';
import {Link, Redirect, useNavigate} from 'react-router-dom';
import axios from 'axios';

const SignupPage = (props) => {
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();

    const signUpInfo = {
      username: document.getElementById('signup-username').value,
      email: document.getElementById('email').value,
      password: document.getElementById('signup-password').value,
      language: document.getElementById('selectLanguage').value
    };

    axios.post('http://localhost:3000/signup', signUpInfo)
      .then(function (response) {
        console.log(response);
        navigate('/');
      })
      .catch(function(error){
        console.log(error);
      });
    console.log('Made Axios Request');
    
  }

  return (
    <div id="signup-page"> 
      <div id="signup-page-container">
        <h1>Sign Up</h1>
        <div>
          <form id="signup-input">
            <input id="signup-username" placeholder="Username"></input>
            <input id="email" placeholder="E-mail" ></input>
            <input id="signup-password" placeholder="Password" ></input>
            <div className="selet-box">
              <label>Select your Language</label>
                <select id="selectLanguage">
                  <option value="none" selected disabled hidden>Language</option>
                  <option value="en">English</option>
                  <option value="ko">Korean</option>
                  <option value="es">Spanish</option>
                </select>
            </div>
            <div className="signup-botton-container">
              <button className="signup-button" id="signup-submit" onClick={submitHandler}>Sign Up</button>
              <div id="back-to-login"><Link to="/">Back to Login</Link></div>
              {/* <button className="signup-button"><Link to="/">Back to Login</Link></button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignupPage;