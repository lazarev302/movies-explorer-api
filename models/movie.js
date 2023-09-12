const mongoose = require('mongoose');

const { Schema } = mongoose;
const isURL = require('validator/lib/isURL');

const { ObjectId } = mongoose.Schema.Types;

const movieSchema = Schema({
  country: {
    type: String,
    required: true,
  }, // страна создания фильма
  director: {
    type: String,
    required: true,
  }, // режиссёр фильма
  duration: {
    type: Number,
    required: true,
  }, // длительность фильма
  year: {
    type: String,
    required: true,
  }, // год выпуска фильма
  description: {
    type: String,
    required: true,
  }, // описание фильма
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  }, // ссылка на постер к фильму
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  }, // ссылка на трейлер фильма
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  }, // мини изображение постера к фильму
  owner: {
    type: ObjectId,
    ref: 'user',
    required: true,
  }, // ID пользователя, который сохранил фильм
  movieId: {
    type: Number,
    required: true,
  }, // ID фильма, который содержится в ответе сервиса MoviesExplorer
  nameRU: {
    type: String,
    required: true,
  }, // название фильма на русском языке
  nameEN: {
    type: String,
    required: true,
  }, // название фильма на английском языке
});

module.exports = mongoose.model('movie', movieSchema);
