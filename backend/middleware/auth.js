const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
  //try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    req.token = decodedToken;
    const user = User.findOne({ where: { id: decodedToken.id } });
    if (!user) {
      throw 'Invalid user ID';
    } else {
      next();
    }
 /*  } catch {
    res.status(401).json({
      error: new Error('Token incorrecte!')
    });
  } */
};
