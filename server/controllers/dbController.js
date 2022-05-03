const db = require("../model.js");

const dbController = {};

// Login Route => verify user info with users Table
dbController.checkUser = async (req, res, next) => {
  const { username, password } = res.locals.loginUser;
  console.log("name is : ", username);
  console.log("password is : ", password);
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
    const loginResults = {
      success: true,
      userId: userInfo.rows[0].user_id,
      username: userInfo.rows[0].name,
      language: userInfo.rows[0].language
    }
    res.locals.data = loginResults
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