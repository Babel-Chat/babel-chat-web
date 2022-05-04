const { Router } = require('express');
const userController = require('../controllers/userController.js')
const dbController = require('../controllers/dbController.js')
const messagesRouter = Router();

//get the messages
messagesRouter.get('/',
 dbController.getMessages,
 (req,res) => {
    res.status(200).json(res.locals.data);
 }
) 


module.exports = messagesRouter