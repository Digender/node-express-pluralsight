function bookMiddleware(Book) {
  function getBookById(req, res, next) {
    const id = req.params.bookId;
    Book.findById(id, (err, book) => {
      if (err) return res.send(err);
  
      if (!book) return res.status(400).send('Did not find the Book By Id');
  
      req.book = book;
      return next();
    });
  }

  return { getBookById };
}

module.exports = bookMiddleware;