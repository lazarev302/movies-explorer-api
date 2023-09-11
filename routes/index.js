const router = require('express').Router();
const auth = require('../middlewares/auth');
const { registerUser, loginUser } = require('../controllers/users');
const CustomNotFoundCode = require('../errors/CustomNotFoundCode');
const userRouter = require('./users');
const movieRouter = require('./movies');

const {
  loginUserValidator,
  registerUserValidator,
} = require('../middlewares/validation');

// Маршрут регистрации пользователя
router.post('/signup', registerUserValidator, registerUser);

// Маршрут входа пользователя
router.post('/signin', loginUserValidator, loginUser);

router.use(auth);

router.use('/', userRouter);
router.use('/', movieRouter);

router.use('*', (req, res, next) => {
  next(new CustomNotFoundCode('Страница не найдена'));
});

module.exports = router;
