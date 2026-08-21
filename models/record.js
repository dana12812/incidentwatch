// models/user.js

const mongoose = require('../config/database')

const userSchema = new mongoose.Schema({

});

module.exports = mongoose.model('User' , userSchema)