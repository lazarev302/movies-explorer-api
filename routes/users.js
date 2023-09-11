const userRouter = require('express').Router();
const {
  getCurrentUserInfoValidator,
  editUserInfoValidator,
} = require('../middlewares/validation');
const { getCurrentUserInfo, editUserInfo } = require('../controllers/users');

userRouter.get('/users/me', getCurrentUserInfoValidator, getCurrentUserInfo);

userRouter.patch('/users/me', editUserInfoValidator, editUserInfo);

module.exports = userRouter;
