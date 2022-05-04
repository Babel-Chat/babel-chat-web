import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ChatsMenu from '../components/chatsMenu';
import ChatRoom from '../components/chatRoom';

const MainPage = (props) => {
  const {state, setState} = props;
  console.log('Props: ', props);

  return (
    <div id="main-page">
      {/* Head of Main Page */}
      <div>
        <h1>International Chat</h1>
      </div>
      <div> 
        <ChatRoom key={'chatroom'} state={state} setState={setState}/>
        <ChatsMenu key={'chatmenu'} state={state} setState={setState}/>
      </div>
    </div>
  )
}

export default MainPage;