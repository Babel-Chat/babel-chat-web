import React, { Component } from 'react';
import axios from 'axios';


const ChatRoom = (props) => {
  const { messages, current_room_id } = props; // an array of message objects {text: string, created_at: timestamp, created_by: username}

  const messagesBox = [];
  messages.forEach(el => {
    messagesBox.push(
    <div class="message_box">
      <div class="created_by"><p>{el.created_by}</p></div>
      <div class="message_text"><p>{el.text}</p></div>
      <div class="crated_at"><p>{el.created_at}</p></div>
    </div>
    );
  });

  const handleSendMessage = () => {

  };


  if (messages.length){
    return (
      <div class="chat_box_container">
        <div class="message_box_container">
          { messagesBox }
        </div>
        <div>
          <form>
            <input type="text"></input>
            <input type="submit">SEND</input> 
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