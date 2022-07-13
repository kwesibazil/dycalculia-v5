const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema  = mongoose.Schema

const UserSchema = new mongoose.Schema({
  email:{
    trim: true,
    index:true,
    type: String,
    unique: true,
    required: true
  },
  hash:{
    trim: true,
    type: String,
    minLength: 8,
    required: true
  },
  userRole:{
    trim: true,
    type: String,
    required:true,
    default: 'guest',
    enum: ['guest', 'admin']
  },
  prognosis:{
    trim: true,
    index: true,
    type: String,
    required: true,
    default: 'untested',
    enum: ['Not Dyscalculic', 'Low Dyscalculic', 'Moderate Dyscalculic', 'High Dyscalculic', 'untested'],
  },
  gameStats: [{ type: Schema.Types.ObjectId, ref: 'stats' }]
},{timestamps:true, collection: 'users'})

UserSchema.plugin(uniqueValidator, {message: 'sorry, user already exist.'})

module.exports = mongoose.model('User', UserSchema)