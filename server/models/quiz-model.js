const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const QuizSchema = new mongoose.Schema({
  title: {
    trim: true, 
    type: String,
    unique: true,
    required: true
  },
  name: {
    trim: true, 
    type: String,
    unique: true,
    required: true
  }, 
  answer:{
    type: Number, 
    min: 0, 
  },
  optionA:{
    type: Number, 
    min: 0, 
  },

  optionB:{
    type: Number, 
    min: 0, 
  },

  optionC:{
    type: Number, 
    min: 0, 
  },
  optionD:{
    type: Number, 
    min: 0, 
  }

},{timestamps: true, collection: "quizzes"})


QuizSchema.plugin(uniqueValidator, {message: 'sorry, question already exist.'})

module.exports = mongoose.model('Quiz', QuizSchema)
