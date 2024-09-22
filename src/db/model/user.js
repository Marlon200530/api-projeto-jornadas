const mongoose = require('mongoose');
require('../mongoose.js'); //connectar  a base de dados
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate(email) {
      if (!validator.isEmail(email)) throw new Error('O email e invalido');
    } 
  },
  password: { type: String, required: true },
  examsTaken: [
    {
      exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
      score: { type: Number },
      dateTaken: { type: Date, default: Date.now }
    }
  ], 
  
  tokens:[{
    token: {
      type: String,
      required: true
    }
  }]
});



UserSchema.statics.findByCredentials = async (email, password) => {
  try {
    const user = await User.findOne({email}); 
  
  if(!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password); 
  console.log(isMatch);

  if(!isMatch) {
    throw new Error('Unable to login');
  }

  return user;

  } catch (error) {

  }
  
}

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({_id: user._id.toString()}, 'marlonNhantumbo');
  user.tokens = user.tokens.concat({token});

  await user.save()
  return token;
} 


const User = mongoose.model('User', UserSchema);

module.exports = User;
