import React, { Component, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ChatsMenu from '../components/chatsMenu';
import ChatRoom from '../components/chatRoom';

const MainPage = (props) => {
  const {state, setState} = props;

  const [selectedRoom, setSelectedRoom] = useState(false);

  console.log('Props: ', props);

  return (
    <div id="main-page">
      <div id="main-page-container">
        {/* Head of Main Page */}
        <div id="main-page-header">
         
          <h1>Babel Chat</h1>
            
        </div>
        <div id="null-div">
        </div>
        <div id="main-chat-room"> 
          <ChatRoom  key={'chatroom'} selectedRoom={selectedRoom} state={state} setState={setState}/>
        </div>
        <div id="main-chat-menu">
          <ChatsMenu key={'chatmenu'} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} state={state} setState={setState}/>
        </div>
      </div>
    </div>
  )
}

export default MainPage;