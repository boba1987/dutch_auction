const tokenStore = require('../../utils/tokenStore');
const { validationResult } = require('express-validator/check');
// Replace with DB
let users = [{
  id: 0,
  userName: 123,
  password: 1111
}];

const saveUser = async ({userName, password}) => {
  const exists = users.some(user => user.userName === userName);
  if (exists) {
    throw new Error('User name already exists');
  }
  
  users.push({
    id: users.length,
    userName,
    password
  });
}

const login = async (req) => {
  let {userName, password} = req.body;

  let user = users.find(user => user.userName == userName);
  debugger;
  if (!user) {
    throw new Error(JSON.stringify(
      {
        status: 403,
        success: false,
        message: 'Incorrect userName or password'
      }
    ));
  }
  let mockedUsername = user.userName.toString();
  let mockedPassword = user.password.toString();

  if (userName && password) {
    if (userName === mockedUsername && password === mockedPassword) {
      let token = tokenStore.generateToken(user.id);
      // return the JWT token for the future API calls
      return {
        success: true,
        message: 'Authentication successful!',
        token: token
      }
    } else {
      throw new Error(JSON.stringify(
        {
          status: 403,
          success: false,
          message: 'Incorrect userName or password'
        }
      ));
    }
  } else {
    throw new Error(JSON.stringify({
        status: 400,
        success: false,
        message: 'Authentication failed! Please check the request'
      }
    ));
  }
}

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await saveUser(req.body);
    } catch(error) {
      console.error(error);
      return res.status(400).send(error.toString());
    }

    res.sendStatus(200);
}

exports.login = async (req, res) => {
  try {
    debugger;
    let loginDetails = await login(req, res);
    res.json(loginDetails);
  } catch(error) {
    console.error(error);
    const status = typeof error == 'object' ? JSON.parse(error.message).status || 400 : 400
    res.status(status).send(error.toString());
  }
}