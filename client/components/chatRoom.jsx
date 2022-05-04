import React, { Component } from 'react';
import axios from 'axios';


const ChatRoom = (props) => {
  const { messages, current_room_id, language, username} = props; // messages: an array of message objects {text: string, created_at: timestamp, created_by: username}

  const messagesBox = [];
  messages.forEach(el => {
    messagesBox.push(
    <div className="message_box">
      <div className="created_by"><p>{el.created_by}:</p></div>
      <div className="message_text"><p>{el.text}</p></div>
      <div className="created_at"><p>{el.created_at}</p></div>
    </div>
    );
  });

  const handleSendMessage = () => { 
    axios.post('http://localhost:3000/messages', { 
      text: document.getElementById('message').value,
      created_by: username,
      created_at: new Date().toLocaleString(),
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };


  if (messages.length){
    return (
      <div className="chat_box_container">
        <div className="message_box_container">
          { messagesBox }
        </div>
        <div className="message_send_container">
          <form>
            <input id="message" type="text"></input>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
    }
  else {
    return (
      <p>No messages!</p>
    )
  }
};

export default ChatRoom; 