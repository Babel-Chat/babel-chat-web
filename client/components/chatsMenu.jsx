import React from 'react';

const ChatsMenu = (props) => {
  const {chats} = props; // an array of objects [{username: , id: }, ]

  const chatSelectHandler = () => {
    
  };
  // create a buttons array to store JSX elements of type button that contain the name of each friend 
  const buttons = [];
  // otherUsers is an object with an id property and a username property
  chats.forEach(otherUsers => {
    buttons.push(<button className="userButton" onClick={chatSelectHandler} otherUsername={otherUsers.username} otherID={otherUsers.id}>{otherUsers.username}</button>)
  });
  return (
    <div>
      { buttons }
    </div>
  );
}

export default ChatsMenu;