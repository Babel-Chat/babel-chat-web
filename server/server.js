const express = require("express");
const app = express();
const path = require('path');
const PORT = 3000;
// Route Imports


// Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Landing
app.get("/", (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
})

// handle requests fro static files -> specify the root directory to serve static assets
app.use(express.static(path.resolve(__dirname, '../client')));

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

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

module.exports = app