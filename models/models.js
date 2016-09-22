var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String, //hash created from password
    createdAt: {type: Date, default: Date.now}
});

var postSchema = new mongoose.Schema({
    createdBy: String,
    createdAt: {type: Date, default: Date.now},
    text: String
});

//synthesizing models
mongoose.model('Post', postSchema);
mongoose.model('User', userSchema);