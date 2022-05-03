import React, { Component } from 'react';
import axios from 'axios';


const ChatRoom = (props) => {

  const getMessages = () => {
    axios.get('/chatroom?ID=12345')
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }


}

export default ChatRoom; 