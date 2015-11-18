var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var AccountSchema = new Schema({
    username: String,
    password: String
});

// passport-local-mongoose plugin simplify the operation
AccountSchema.plugin(passportLocalMongoose);

var Account = mongoose.model('Account', AccountSchema);

module.exports = Account;