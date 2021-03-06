const userController = {};

// Sign-up extract and save new user's account info from frontend into res.locals
userController.addUser = (req, res, next) => {
  const userProps = ['username', 'email', 'password', 'language'];
  res.locals.newUser = {};

  for (const prop of userProps) {
    // if one of these 4 props are missing send an error message
    if (!req.body[prop]) {
      return next({
        log: 'UserController.addUser ERROR: Properties on request body undefined',
        message: {
          err: 'UserController.addUser ERROR: Incorrect data received',
        },
      });
    }
    res.locals.newUser[prop] = req.body[prop];
  }
  return next();
};

// Extract user email/pw from frontent, and store into res.locals
userController.checkUser = (req, res, next) => {
  const userProps = ['username', 'password'];
  res.locals.loginUser = {};
  for (const prop of userProps) {
    if (!req.body[prop]) {
      return next({
        log: 'UserController.checkUser ERROR: Properties on request body undefined',
        message: {
          err: 'UserController.checkUser ERROR: Incorrect data received',
        },
      });
    }
    res.locals.loginUser[prop] = req.body[prop];
  }
  return next();
};

module.exports = userController;