const { Router } = require('express');
// also need to import controllers here
const userController = require('../controllers/userController.js')
const dbController = require('../controllers/dbController.js')
const signupRouter = Router();

// post req to sign up (name,pw, lang)
signupRouter.post('/',
  userController.addUser,
 // send to dbcontroller.adduser to add this user
  dbController.addUser,
 // think point: what if the user is already a user? Would we need to check user? **
  (req,res) => {
    res.status(200).json(res.locals.data);
    //what does front end want?**
 }
)
module.exports = signupRouter;