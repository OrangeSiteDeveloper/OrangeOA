const mongoose = require('../model/db');
const { Schema } = mongoose;

const getBookSchema = new Schema({

  bookName: {
    default: "",
    type: String
  },
  bookId: {
    default: "",
    type: String
  },
  importTime: {
    default: "",
    type: String
  },
  borrowTime: {
    default: "",
    type: String
  },
  status: {
    default: "",
    type: String
  },
  borrowPeopleName: {
    default: "",
    type: String
  }

})

const bookModel = mongoose.model('book', getBookSchema, 'book')

module.exports = {
  bookModel
}
