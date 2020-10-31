const express = require('express');
const bookController = require('./book.controller');
const bookMiddleware = require('./book.middleware');

function routes(Book) {
  const bookRouter = express.Router();
  const controller = bookController(Book);
  const middleware = bookMiddleware(Book);
  
  bookRouter
    .route('/books')
    .get(controller.get)
    .post(controller.post);

  bookRouter.use('/books/:bookId', middleware.getBookById);

  bookRouter.route('/books/:bookId')
  .get(controller.getById)
  .put(controller.put)
  .patch(controller.patch)
  .delete(controller.deleteById);
  
  return bookRouter;
}

module.exports = routes;