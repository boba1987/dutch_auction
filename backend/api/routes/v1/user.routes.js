const express = require('express');

const controller = require('../../controllers/user.controller');

const router = express.Router();

const { checkSchema } = require('express-validator/check');
const userSchema = {
  userName: {
    errorMessage: '\'userNameField\' required'
  },
  password: {
    errorMessage: '\'password\' required',
    isLength: {
      errorMessage: 'Password should be at least 4 chars long',
      options: { min: 4 }
    }
  }
};


router
  .route('/register')
    /**
     * Insert new user in the database
     */
    .post(checkSchema(userSchema), controller.create)

module.exports = router;
