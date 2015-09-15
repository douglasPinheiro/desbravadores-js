var mongoose = require('mongoose'),
    honorCategory = require('./honorCategory');

var honorSchema = new mongoose.Schema({
    name: String,
    category: honorCategory
});

mongoose.model('honor', honorSchema);
