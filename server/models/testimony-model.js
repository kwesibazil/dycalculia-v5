const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const testimonySchema = new mongoose.Schema({
  age: {
    max: 4,
    trim: true,
    type: String,
    require: true
  },
  gender: {
    trim: true,
    type: String,
    required: true,
    enum : ['male','female']
  },
  author:{
    trim: true,
    type: String,
    require: true
  },
  bootStrap:{
    trim: true,
    type: String,
    require: true
  },
  pathToImg:{
    trim: true,
    type: String,
    required: true,
  },
  urlToImg:{
    trim: true,
    type: String,
    required: true,
  },
  urlToArticle:{
    trim: true,
    type: String,
    required: true,
  },
  body: {
    trim: true,
    type: String,
    required: true,
  }
},{timestamps: true, collection: "testimonies"})

testimonySchema.plugin(uniqueValidator)

module.exports = mongoose.model('testimony',  testimonySchema)
