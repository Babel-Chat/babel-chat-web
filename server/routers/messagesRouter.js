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

// will need to update the messages 
messagesRouter.patch('/',
 // add middle ware **
 dbController.addMessages,
 (req,res) => {
   res.status(200)
 }
)


module.exports = messagesRouter