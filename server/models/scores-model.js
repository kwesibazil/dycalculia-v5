const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const scoreSchema = new mongoose.Schema({
  user_id: {
    trim: true,
    type: String,
    required: true
  },
  username:{
    trim: true,
    index:true,
    type: String,
    required: true
  },
  score:{
    type: String, 
    trim: true,
  },
  percent:{
    type: Number, 
    min: 0, 
  },
},{timestamps: true, collection: "scores"})


module.exports = mongoose.model('Score', scoreSchema)
