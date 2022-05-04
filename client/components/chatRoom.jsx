import React, { Component } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useEffect } from 'react';
//keep url same as the server
const socket = io.connect("http://localhost:3000")


const ChatRoom = (props) => {
  const { state, setState } = props; // messages: an array of message objects {text: string, created_at: timestamp, created_by: username}
  console.log('State Upon Chat Room Rerender: ', state);
  const messagesBox = [];
  state.messages.forEach(el => {
    messagesBox.push(
    <div className="message_box">
      <div className="created_by"><p>{el.created_by}:</p></div>
      <div className="message_text"><p>{el.text}</p></div>
      <div className="created_at"><p>{el.created_at}</p></div>
    </div>
    );
  });

  // const joinRoom = () => {
  //    if (state.current_room_id !== "") {
  //      socket.emit("join_room", state.current_room_id);
  //    }
  // };

  const sendMessage = (e) => {
    e.preventDefault();

    const dataToSend = {
      message: {text: document.getElementById('current_message').value,
                created_by: state.username, 
                created_at: new Date().toLocaleString()},
      language: state.language,
      friend_language: state.friend_language,
      room_id: state.current_room_id
    };

    socket.emit("send_message", dataToSend);
    const newState = JSON.parse(JSON.stringify(state));
    newState.messages.push(dataToSend.message);
    setState(newState);
    document.getElementById('current_message').value = '';
  };

  useEffect(() =>{
    socket.on('receive_message', (data) =>{
      console.log('data: ', data);
      console.log('state before parse: ', state.messages)
      // current state.message is empty array
      const newerState = JSON.parse(JSON.stringify(state));
      console.log('before data push: ', newerState.messages);
      newerState.messages.push(data);
      console.log('after data push: ', newerState.messages)
      setState(newerState);
      // setState(state => ({...state, messages: newerState}));

      // messages.push(data);

    })
  },[socket, state]);



  // const handleSendMessage = () => { 
  //   console.log('current room id: ', current_room_id)
  //   axios.post('http://localhost:3000/messages', { 
  //     room_id: current_room_id,
  //     text: document.getElementById('current_message').value,
  //     created_by: state.username,
  //     created_at: new Date().toLocaleString(),
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // };


  // if (state.messages.length){
    return (
      <div className="chat_box_container">
        <div className="message_box_container">
          { messagesBox }
        </div>
        <div className="message_send_container">
          <form>
            <input id="current_message" type="text"></input>
            <button type="submit" onClick={sendMessage}>Submit</button>
          </form>
        </div>
      </div>
    )
    }
  // else {
  //   return (
  //     <p>No messages!</p>
  //   )
  // }
// };

export default ChatRoom; 