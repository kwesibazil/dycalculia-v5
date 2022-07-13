const User = require('../models/user-model')
const {StatusCodes} = require('http-status-codes')
const {genPassword}  = require('../helpers/password.js')
const { UnauthorizedError, ForbiddenError} = require('../errors')

const loginFailure = (req, res) =>{
  throw new ForbiddenError('Incorrect email or password')
}

const loginSuccess = (req, res) => { 
  res.status(StatusCodes.OK).json({
    username: req.user.email,
    status: req.user.prognosis
  })
}

const loginStatus = (req, res) =>{
  if(req.isAuthenticated) res.status(StatusCodes.OK).json({'isAuthenticated': req.isAuthenticated()})
  else throw new UnauthorizedError('user not login')
}


const logout = (req, res) =>{ 
  try{
    //req.logout()
    req.session.destroy()
    res.status(StatusCodes.OK).json({'msg': 'logout successful'})
  }catch(err){
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err: "Failed to logout user"})
  }
}


const register = async (req, res) =>{
  const hash = await genPassword(req.body.pwd)
  const newUser = new User({
    email: req.body.email,
    hash: hash,
  })

  newUser.save()
    .then(_ => res.status(StatusCodes.CREATED).json({msg: 'registration success'}))
    .catch(err => res.status(StatusCodes.CONFLICT).json({err: err.errors.email.message}))
}

const controller = {register, loginFailure, loginSuccess, loginStatus, logout}
module.exports = controller
