const { Joi, celebrate } = require('celebrate');

const emailPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

// Валидатор для проверки данных при создании нового пользователя.
const registerUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
});

// Валидатор для проверки данных при входе пользователя в cайт.
const loginUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
});


// Валидатор для проверки данных при редактировании информации о пользователе.
const editUserInfoValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
  }),
});

// Валидатор для проверки данных при создании нового фильма.
const createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(emailPattern),
    trailerLink: Joi.string().required().regex(emailPattern),
    thumbnail: Joi.string().required().regex(emailPattern),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

// Валидатор для проверки данных при удалении фильма.
const removeMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  loginUserValidator,
  registerUserValidator,
  createMovieValidator,
  removeMovieValidator,
  editUserInfoValidator,
};
