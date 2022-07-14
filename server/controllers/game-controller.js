const Game = require('../models/game-model')

const {StatusCodes} = require('http-status-codes')
const {isEmpty} = require('../helpers/utilities')

const fetchGames = async (req, res) =>{
  const result = await Game.find({}).select(['-_id']).limit()
  if(!isEmpty(result))
    res.status(StatusCodes.OK).json(result)  
}



const controller = {fetchGames}
module.exports = {controller}
