const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { checkSchema, validationResult } = require('express-validator/check');
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

let users = [];

app.route('/user/register')
  .post(checkSchema(userSchema), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.sendStatus(200);
  });

app.route('/user/login')
  .post(checkSchema(userSchema), (req, res) => {

  });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Starting backend on port ${port}`));