const mongoose = require('../model/db');
const { Schema } = mongoose;

const users = new Schema({

  loginStr: {
    default: "",
    type: String
  },
  auth: {
    default: "",
    type: String
  }

})


const usersModel = mongoose.model('users', users, "users");

module.exports = {
  usersModel
}
