const tokenStore = require('../../utils/tokenStore');
const { validationResult } = require('express-validator/check');
const formatApiError = require('../../utils/APIError').formatApiError;
// Replace with DB
let users = [{
  id: 0,
  userName: 'user',
  password: 'pass'
}];

const saveUser = async ({userName, password}) => {
  const exists = users.some(user => user.userName === userName);
  if (exists) {
    throw new Error(formatApiError(400, 'User name already exists'));
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
  if (!user) {
    throw new Error(formatApiError(403, 'Incorrect user name or password'));
  }
  let mockedUsername = user.userName.toString();
  let mockedPassword = user.password.toString();

  if (userName && password) {
    if (userName === mockedUsername && password === mockedPassword) {
      let token = tokenStore.generateToken(user.id);
      // return the JWT token for the future API calls
      return {
        userName,
        success: true,
        message: 'Authentication successful!',
        token: token
      }
    } else {
      throw new Error(formatApiError(403, 'Incorrect user name or password'));
    }
  } else {
    throw new Error(formatApiError(400, 'Authentication failed! Please check the request'));
  }
}

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    try {
      await saveUser(req.body);
      res.status(200).send(await login(req));
    } catch(error) {
      console.error(error);
      return res.status(JSON.parse(error.message).status).send(error.message);
    }
}

exports.login = async (req, res) => {
  try {
    let loginDetails = await login(req, res);
    res.json(loginDetails);
  } catch(error) {
    console.error(error);
    res.status(JSON.parse(error.message).status).send(error.message);
  }
}