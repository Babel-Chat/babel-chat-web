import React from 'react';
import axios from 'axios';

const ChatsMenu = (props) => {
  const {chats, language} = props; 
  console.log('chats: ', chats);
  
  const chatSelectHandler = (room_id) => {
    axios.get('http://localhost:3000/messages', {
      params: {
        room_id: room_id,
        language: language
      }
    })
    .then(data => {
    
      props.state.messages = JSON.parse(data);
      props.state.current_room_id = room_id;
    })
  };
  // create a buttons array to store JSX elements of type button that contain the name of each friend 
  const buttons = [];
  // otherUsers is an object with an id property and a username property
  chats.forEach(chat => {                                   // need to add proper chat_id
    buttons.push(<button className="userButton" onClick={()=> {chatSelectHandler(chat.room_id)}} otherUsername={chat.friend} >{chat.friend}</button>)
  });
  return (
    <div id="chats-menu">
      <div id="chats">
        { buttons }
      </div>
      <div>
        <p>this renders</p>
      </div>
    </div>
  );
}

export default ChatsMenu;