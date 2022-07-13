const User = require('../models/user-model')
const Stats = require('../models//stats-model')

const {StatusCodes} = require('http-status-codes')
const { UnauthorizedError, ForbiddenError} = require('../errors')


const postStats = (req, res) =>{
  
  res.status(StatusCodes.OK).json({})

    // console.log(req.body)
    // console.log(req.session.passport.user)
  // const newStats = {
  //   title: req.body.title,
  //   scores: req.body.score,
  //   user_id: req.session.passport.user.toString()
  // }
  

  // User.findById(req.session.passport.user, (err, user) =>{
  //   if(err)
  //     res.status(StatusCodes.NOT_FOUND).json({"err": "user not found"})
    
  //   user.gameStats = newStats                      //👈updates users
  //   user.save()
  //   .then(_ => res.status(StatusCodes.OK).json({}))
  //   .catch(err => {

  //     console.log(err)
  //     res.status(StatusCodes.BAD_REQUEST).json({"err": "not a valid enum value"})
      
  //   })
  // })  
}

const controller = {postStats }
module.exports = {controller}


