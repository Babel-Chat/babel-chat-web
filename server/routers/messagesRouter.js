const { Router } = require('express');
const userController = require('../controllers/userController.js')
const dbController = require('../controllers/dbController.js')
const messagesRouter = Router();

//get the messages
messagesRouter.get('/')
module.exports = messagesRouter