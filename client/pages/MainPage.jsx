import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ChatsMenu from '../components/chatsMenu';
import ChatRoom from '../components/chatRoom';

const MainPage = (props) => {
  console.log('Props: ', props);

  return (
    <div id="main-page">
      {/* Head of Main Page */}
      <div>
        <h1>International Chat</h1>
      </div>
      <div> 
        <ChatRoom messages={props.state.messages} setState={props.setState}/>
        <ChatsMenu chats={props.state.chats} language={props.state.language} setState={props.setState}/>
      </div>
    </div>
  )
}

export default MainPage;