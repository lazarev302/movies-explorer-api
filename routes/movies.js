const movieRouter = require('express').Router();
const {
  createMovieValidator,
  removeMovieValidator,
} = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  removeMovie,
} = require('../controllers/movies');

// Маршрут получения списка фильмов
movieRouter.get('/movies', getMovies);

// Маршрут создания нового фильма
movieRouter.post('/movies', createMovieValidator, createMovie);

// Маршрут удаления фильма
movieRouter.delete('/movies/:movieId', removeMovieValidator, removeMovie);

module.exports = movieRouter;
