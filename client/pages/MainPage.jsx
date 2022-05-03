import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ChatsMenu from '../components/chatsMenu';
import ChatRoom from '../components/chatRoom';

const MainPage = (props) => {
  

  return (
    <div>
      {/* Head of Main Page */}
      <div>
        <h1>International Chat</h1>
      </div>
      <div> 
        <ChatRoom />
        <ChatsMenu />
      </div>
    </div>
  )
}

export default MainPage;