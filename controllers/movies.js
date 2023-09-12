const Movie = require('../models/movie');
const CustomInvalidDataError = require('../errors/CustomInvalidDataError');
const CustomAccessDeniedError = require('../errors/CustomAccessDeniedError');
const CustomNotFoundCode = require('../errors/CustomNotFoundCode');

// Получение массива с  фильмами
const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

// Создание нового фильма
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new CustomInvalidDataError(
            'Переданы некорректные данные при создании нового фильма',
          ),
        );
      } else {
        next(err);
      }
    });
};

// Удаление фильма
const removeMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new CustomNotFoundCode('Фильм с указанным _id не найден');
    })
    .then((movie) => {
      const owner = movie.owner.toString();
      if (req.user._id === owner) {
        Movie.deleteOne(movie)
          .then(() => {
            res.send(movie);
          })
          .catch(next);
      } else {
        throw new CustomAccessDeniedError('Невозможно удалить данный фильм');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new CustomInvalidDataError(
            'Переданы некорректные данные при попытке удаления фильма',
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  removeMovie,
};
