var mongoose = require('mongoose'),
    honor = require('./honor');

var honorCategorySchema = new mongoose.Schema({
    name: String,
    honors: [honor]
});

mongoose.model('honorCategory', honorCategorySchema);
