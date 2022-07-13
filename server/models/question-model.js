const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// {
//   "name": "screenerTwo",
//   "title": "Do you have difficulties measuring time and judging the passing of time?",
//   "rank": "low",
//   "points": 6.16,
//   "frequency":[{"never":0},{"sometimes":2.464},{"often":3.696}, {"always":6.16}]

// },

const QuestionSchema = new mongoose.Schema({
  title: {
    trim: true, 
    type: String,
    unique: true,
    required: true
  },
  name:{
    trim: true, 
    type: String,
    unique: true,
    required: true
  },
  rank: {
    trim: true, 
    type: String,
    required: true
  },
  points:{
    required: true,
    type: Number
  },
  frequency: {
    never:String,
    sometimes:String,
    often:String,
    always:String
  }

},{timestamps: true, collection: "questions"})


QuestionSchema.plugin(uniqueValidator, {message: 'sorry, question already exist.'})

module.exports = mongoose.model('Question', QuestionSchema)
