const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");
const PORT = 3000;
const loginRouter = require('./routers/loginRouter.js');
const signupRouter = require('./routers/signupRouter.js');
const messagesRouter = require('./routers/messagesRouter.js');
const axios = require('axios');

// Parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// WEBSOCKET RELATED
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});


io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  // socket.on("join_room", (data) => {
  //   socket.join(data);
    // })

  socket.on("send_message", (data) => { 
    console.log('Data in server: ', data)
    const translatedMessage = JSON.parse(JSON.stringify(data.message));
    // makes a deep copy of the data.message obj
    axios.post("https://dev-api.itranslate.com/translation/v2/", {
        "source": {"dialect": data.language, "text": data.message.text},
        "target": {"dialect": data.friend_language}
      },
      { 
        headers: {
        "Authorization": "Bearer ab4ab032-e8d1-44bb-a964-5834ff0ce995",
        "Content-Type": "application/json",
      }
    })
    .then((response) => {
      // there is always a data key in the response that is returned. This is a part of Axios. So your result will be under response.data
      console.log('API Response: ', response.data);
      translatedMessage.text = response.data.target.text;
      socket.broadcast.emit("receive_message", translatedMessage);
      // socket.to(data.room_id).emit("receive_message", translatedMessage);
    })
    .catch((error) => {
        console.log('Error: ', error);
    });
    
    // fe will send the message obj, and the room id
    // https://dev-api.itranslate.com/translation/v2/

    // query translate API to get tranlated message
    // query database to grab message arrays in both languages
      // parse arrays and add new message to each array
      // update database with new message strings in both languages

    // send only translated message data

    // add translated language to database
  });
});

// Parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// handle requests fro static files -> specify the root directory to serve static assets
app.use(express.static('client'));

// Route Imports
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/messages', messagesRouter);
// Landing
app.get("/", (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
})


// create a route handler
// app.use()

// Unknown route handler
app.use((req, res) => res.status(404).send("Error, unkown request"));


// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);
});

// may need to change to server.listen
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

// module.exports = server