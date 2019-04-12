let jwt = require('jsonwebtoken');

exports.checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).json({
      success: false,
      message: 'Token is not valid'
    });
  }
};

exports.generateToken = (id, userName) => {
    return jwt.sign({
        id,
        userName
    },
        process.env.SECRET,
        { expiresIn: '24h'}
    );
}
