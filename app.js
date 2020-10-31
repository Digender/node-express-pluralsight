const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const Book = require('./models/bookModel');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
const option = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER}/booksAPI?retryWrites=true&w=majority`;
mongoose.connect(mongoURI, option).then(function(response){
  //connected successfully
  console.log('connected'); 
}, function(err) {
  //err handle
  console.log(err, 'Error');
});

const bookRouter = require('./book/book.router')(Book);
app.use('/api/', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my api');
});
app.listen(port, () => {
  console.log(`listening on port: ${port}.`);
});


module.exports = app;