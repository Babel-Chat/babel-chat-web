import React, { Component } from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import { useEffect } from 'react';

//keep url same as the server
const socket = io.connect("http://localhost:3000")

const  App = () => {
  
  const sendMessage =() => {
    socket.emit("send_message", {message: "hello joe"});
  }


  useEffect(() => {
    socket.on('recieve_message', (data) =>{
      alert(data.message)
    })
  },[socket]);

  return (
    <div id="App">
      Delete this later. Do not commit me!
      <input placeholder='Message...'/>
      <button onClick={sendMessage}>Send Message</button>
      
    </div>
  )
}

export default App;