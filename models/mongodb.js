// DB Connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodejs',{useMongoClient:true});
exports.mongoose = mongoose;
