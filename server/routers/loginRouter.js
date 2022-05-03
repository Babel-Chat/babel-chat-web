const { Router } = require('express');
// also need to import controllers here
const userController = require('../controllers/userController.js')
const dbController = require('../controllers/dbController.js')
const loginRouter = Router();



//post req to log in
loginRouter.post('/',
    // send to usercontroller.checkUser 
  userController.checkUser,
    //then dbcontroller.checkUser
  dbController.checkUser,
    // if login is successful, send to chat room?
  (req,res) =>{
    res.status(200).json(res.locals.data);
  }
    );
    

// patch req to edit the user password


// patch req to change user language






module.exports = loginRouter;