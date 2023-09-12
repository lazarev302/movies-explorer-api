const { NODE_ENV, SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');
const CustomAuthenticationError = require('../errors/CustomAuthenticationError');
const { SECRET_KEY_DEV } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new CustomAuthenticationError('Необходимо авторизоваться');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? SECRET_KEY : SECRET_KEY_DEV,
    );
  } catch (err) {
    next(new CustomAuthenticationError('Необходимо авторизоваться'));
    return;
  }
  req.user = payload;
  next();
};
