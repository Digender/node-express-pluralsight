const should = require('should');
const sinon = require('sinon');
const bookController = require('./book.controller');


describe('Test Book APIS', () => {
  describe('POST', () => {

    it ('should not allow and empty title on post', () => {
      const Book = function (book) {  
        this.save = () => {}
      }

      const req = {
        body: {
          author: "Digender"
        }
      };

      const res = {
        send: sinon.spy(),
        status: sinon.spy(),
        json: sinon.spy(),
      };

      const controller = bookController(Book);
      controller.post(req, res);
      res.status.calledWith(404).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    });
  })
})