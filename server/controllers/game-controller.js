const Game = require('../models/game-model')
const Testimony = require('../models/testimony-model')

const {StatusCodes} = require('http-status-codes')
const {isEmpty} = require('../helpers/utilities')

const fetchGames = async (req, res) =>{
  const result = await Game.find({}).select(['-_id']).limit()
  if(!isEmpty(result))
    res.status(StatusCodes.OK).json(result)  
}

const fetchTestimonies = async (req, res) =>{
  const result = await Testimony.find({}).select(['-_id']).limit()
  if(!isEmpty(result))
    res.status(StatusCodes.OK).json(result)  
}


const controller = {fetchGames, fetchTestimonies}
module.exports = {controller}
