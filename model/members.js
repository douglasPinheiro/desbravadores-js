var mongoose = require('mongoose');

var memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  birthday: Date,
  phone: String,
  cellphone: String
});

mongoose.model('member', memberSchema);
