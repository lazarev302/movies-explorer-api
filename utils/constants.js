// Адрес для подключению к базе данных монго в каталог bitfilmsdb
const { URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

// Создание нового ресурса
const CREATED_CODE = 201;

// Ключ для разработки
const SECRET_KEY_DEV = 'dev-secret';

// Статус 500 - ошибка сервера
const INTERNAL_SERVER_ERROR = 500;

module.exports = {
  URL,
  CREATED_CODE,
  SECRET_KEY_DEV,
  INTERNAL_SERVER_ERROR,
};
