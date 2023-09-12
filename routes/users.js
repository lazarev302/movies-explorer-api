const userRouter = require('express').Router();
const {
  editUserInfoValidator,
} = require('../middlewares/validation');
const { getCurrentUserInfo, editUserInfo } = require('../controllers/users');

userRouter.get('/users/me', getCurrentUserInfo);

userRouter.patch('/users/me', editUserInfoValidator, editUserInfo);

module.exports = userRouter;
