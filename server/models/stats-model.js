const mongoose = require('mongoose')

// const ScoreSchema = new mongoose.SchemaType({
//   minutesPlayed:{
//     type: Number,
//   },
//   score: {
//     type: Number,
//     min: 0,
//     default: 0
//   },
//   user_id:{
//     trim: true,
//     type: String,
//     required: true
//   }
// })


const StatsSchema = new mongoose.Schema({
  title: {
    trim: true,
    type: String,
    //required: true
  },
  scores:[],
  user_id: {
    trim: true,
    type: String,
    
  }
},{timestamps: true,  _id: false })


module.exports = mongoose.model('Stat', StatsSchema)