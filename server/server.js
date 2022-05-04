const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");
const PORT = 3000;
const loginRouter = require('./routers/loginRouter.js');
const signupRouter = require('./routers/signupRouter.js');
const messagesRouter = require('./routers/messagesRouter.js');

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
  socket.on("send_message",(data) => { 
    console.log(data)
    socket.broadcast.emit("receive_message", data)
  })
})

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