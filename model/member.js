var mongoose = require('mongoose'),
    honor = require('./honor');

var memberSchema = new mongoose.Schema({
     name: String,
     email: String,
     birthday: Date,
     phone: String,
     cellphone: String,
     honors: [honor]
});

mongoose.model('member', memberSchema);
