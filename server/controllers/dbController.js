const { restart } = require("nodemon");
const db = require("../model.js");

const dbController = {};

// Get array of users chats
/* chats=[
  {room_id: room_id, 
   friend: this is user_id2's name
    (or maybe they are labeled user_id1; we need to check),  
   friend_language: 'two digit code' 
  
  }]

  */

dbController.getChats = async (req, res, next) => {
  const { user_id, language } = res.locals.loginInfo;
  params = [ user_id ];

  try {
    const userQuery = `
    SELECT * FROM chatrooms
    WHERE user_id1 = $1 OR user_id2 = $1;
    `

    const chatRoomInfo = await db.query(userQuery, params)
    let chats = [];
    console.log('Chat Room Info is ', chatRoomInfo)
    for (let i = 0; i < chatRoomInfo.rows.length; i++) {
      const chat = {};
      console.log('this is the room id', chatRoomInfo.rows[i].room_id)
      chat.room_id = chatRoomInfo.rows[i].room_id;
       // user_id is the person who logged in
       // check who the user is
      if (chatRoomInfo.rows[i].user_id1 !== user_id) {
        const friendParams = [chatRoomInfo.rows[i].user_id1];
        try {
          const friendQuery = `
          SELECT name, language FROM users
          WHERE user_id = $1
          `
          const friendInfo = await db.query(friendQuery, friendParams)
          chat.friend = friendInfo.rows[0].name;
          chat.friendLanguage = friendInfo.rows[0].language;
        } catch (error) {
          return next({
            log: `Express error in dbController.getChats middleware ${error}`,
            status: 400,
            message: {
              error: `dbController.getChats: Error: ${error}`
            }
          });  
        }
      }
      else {
        // do the query for user_id2
        const friendParams = [chatRoomInfo.rows[i].user_id2];
        try {
          const friendQuery = `
          SELECT name, language FROM users
          WHERE user_id = $1
          `
          const friendInfo = await db.query(friendQuery, friendParams)
          chat.friend = friendInfo.rows[0].name;
          chat.friendLanguage = friendInfo.rows[0].language;""
        } catch (error) {
          return next({
            log: `Express error in dbController.getChats middleware ${error}`,
            status: 400,
            message: {
              error: `dbController.getChats: Error: ${error}`
            }
          });  
        }
      }
      // push to the chats array
      chats.push(chat);
    }

    // const room_id = chatRoomInfo.rows.room_id

    const loginResults = {
      user_id: user_id,
      language: language,
      chats: chats
    }
    res.locals.data = loginResults;
    return next();
  } catch (error) {
    return next({
      log: `Express error in dbController.getChats middleware ${error}`,
      status: 400,
      message: {
        error: `dbController.getChats: Error: ${error}`
      }
    });
  }

}
  
// Login Route => verify user info with users Table
dbController.checkUser = async (req, res, next) => {
  const { username, password } = res.locals.loginUser;
  const params = [username, password];
  // if user already exist and send error message. **
  try {
    const query = `
    SELECT * FROM users
    WHERE name = $1 AND password = $2;
    `;

    const userInfo = await db.query(query, params);

    if (userInfo.rows[0] === undefined) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist"});
    }
    const loginInfo = {
      user_id: userInfo.rows[0].user_id,
      language: userInfo.rows[0].language,
      // add chats array here
    }
    res.locals.loginInfo = loginInfo
    return next();
  } catch (error) {
    return next({
      log: `Express error in dbController.checkUser middleware ${error}`,
      status: 400,
      message: {
        error: `dbController.checkUser: Error: ${error}`
      }
    });
  }
};

// Sign up Route => add user info into users Table
dbController.addUser = async (req, res, next) => {
  const { username, email, password, language } = res.locals.newUser;
  const params = [email, username, password,language]
  try {
    const query = `
    INSERT INTO users (email, name, password, language)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `;

    const newUser = await db.query(query, params);
    const userId = newUser.rows[0].user_id;

    res.locals.data = {
      success: true,
      userId: userId,
      username: username,
      language: language
    };
    return next();
  } catch (error) {
    return next({
      log: `Express error in dbController.addUser middleware: ${error}`,
      status: 400,
      message: {
        err: `dbController.checkUser: ERROR: ${error}`
      }
    })
  }
};

module.exports = dbController;