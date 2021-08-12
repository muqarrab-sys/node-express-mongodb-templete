const config = require('config');
const jwt = require('jsonwebtoken');

function createAuthToken(user) {
  const tokenData = { _id: user._id };
  const secret = config.get('secretKey');
  const expiresIn = 60 * 60 * 24;

  let token = jwt.sign(tokenData, secret, { expiresIn });

  token = `Bearer ${token}`;

  return { expiresIn, token };
}

module.exports = createAuthToken;
