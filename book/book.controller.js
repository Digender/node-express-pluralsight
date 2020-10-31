function bookController(Book) {
  function get(req, res) {
    const query = req.query.genre ? { genre: req.query.genre } : {};
    Book.find(query, (err, books) => {
      if (err) return res.send(err);
  
      return res.json(books);
    });
  }

  function post(req, res) {
    if (!req.body.title) {
      res.status(404)
      return res.send('Title is required');
    }

    const book = new Book(req.body);
    
    book.save();
    res.status(201)
    return res.json(book);
  }

  function getById(req, res) {
    const book = req.book;
    return res.json(book);
  }

  function put(req, res) {
    const { title, author, genre, read } = req.body;
    const newBook = req.book;
    newBook.title = title;
    newBook.author = author;
    newBook.genre = genre;
    newBook.read = read;

    newBook.save((err) => {
      if (err) return res.send(err);

      return res.json(req.book);
    });
  }

  function patch(req, res) {
    const body = req.body;
    console.log(req.body, req.book);
    if (req.book._id) {
      delete req.book._id;
    }
    const newBook = req.book;
    Object.entries(body).forEach(([key, val]) => {
      newBook[key] = val;
    });
    newBook.save((err) => {
      if (err) return res.send(err);

      return res.json(req.book);
    });
  }

  function deleteById(req, res) {
    req.book.remove((err) => {
      if (err) res.send(err);

      res.status(204);
    });
  }

  return { get, post, getById, put, patch, deleteById };
}

module.exports = bookController;