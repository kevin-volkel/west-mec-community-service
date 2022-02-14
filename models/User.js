const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: [true, 'This username is already in use'],
    maxlength: [50, 'Name must be under 50 characters'],
    minlength: [2, 'Name must be at least 2 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: [true, 'This email is already in use'],
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
      'Please enter a valid email address',
    ],
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password too short']
  },
  permission: {
    type: String,
    default: 'student',
    enum: ['student', 'teacher']
  }
}).pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync());
  next();
});

UserSchema.methods.comparePassword = async function (submittedPassword) {
  const isMatch = bcrypt.compare(submittedPassword, this.password)
  return isMatch;
}
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userID: this._id, username: this.username, permission: this.permission },
    process.env.JWT_SECRET,
    {
      expiresIn: '5d'
    }
  )
}

module.exports = mongoose.model('User', UserSchema)