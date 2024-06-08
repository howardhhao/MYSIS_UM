const { Schema, model } = require('mongoose');
const { genSalt, hash } = require('bcryptjs');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  ic: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

// password hashing function 
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

const User = model('User', UserSchema);
module.exports = User;
