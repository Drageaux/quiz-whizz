var mongoose = require("mongoose");
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    registered: Boolean,
    userId: String,
    userUrl: String,
    email: {type: String, unique: true, dropDups: true},
    name: {type: String, min: 1, max: 14, unique: true, dropDups: true},
    profileImage: String,
    highScore: Number,
    highLevel: Number
});

UserSchema.plugin(timestamps);
module.exports = mongoose.model("User", UserSchema);