const Joi = require('joi')
const {BadRequestError, ForbiddenError} = require('../errors')
const {sanitize} = require('./sanitize')


const validateRegistration = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'email must be a valid email',
      "any.required": "email is required!",
      'string.empty': 'email is not allowed to be empty',
    }),
    pwd: Joi.string().trim().min(8).max(30).regex(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\s@$!%*#^?&]{8,30}$/).required().messages({
      'string.max': 'Password length must be less than or equal to {{#limit}} characters long',
      'string.min': 'Password length must be at least {{#limit}} characters long',
      'string.empty': 'Password is not allowed to be empty',
      "any.required": "Password is required!",
      'string.pattern.base': 'Password must be 8-30 characters long, with at least one number, one lowercase and one uppercase letter.',
    }),
    userRole: Joi.string().trim().optional().valid('guest', 'admin').messages({
      "any.only": "Invalid input"
    })
  }).error(err => {
    if(err[0].code === 'object.unknown' || err[0].code === 'any.only')
      throw new BadRequestError('Registration Failed, Please Try Again.')
    else
      throw new BadRequestError(err)
  })

  await schema.validateAsync(req.body, {abortEarly: true})
    .then(data => sanitize(req.body, data))

  next()
}


const validateLogin = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    pwd: Joi.string().trim().min(8).max(30).regex(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\s@$!%*#^?&]{8,30}$/).required()
  }).error(_ => {throw new ForbiddenError('Incorrect email or password.')})

  await schema.validateAsync(req.body, {abortEarly: true})
    .then(data => sanitize(req.body, data))

  next()
}


const validateGameState = async(req, res, next) =>{
  const schema = Joi.object({
    title: Joi.string().trim().valid('math-puzzle', 'math-crush').messages({
      "any.only": "Invalid input"
    }),
    score: JJoi.number().integer()
}).error(err => {
  if(err[0].code === 'object.unknown' || err[0].code === 'any.only')
    throw new BadRequestError('Failed, saved game data.')
  else
    throw new BadRequestError(err)
  })


  await schema.validateAsync(req.body, {abortEarly: true})
    .then(data => sanitize(req.body, data))

  next()

}



const validateScreenerAnswers = async (req, res, next) => {
  console.log('inside validate screener answers')
  console.log(req.body)
  const schema = Joi.object({
    questionOne:  Joi.number().integer().min(0).max(20),
    questionTwo:  Joi.number().integer().min(0).max(20),
    questionThree:  Joi.number().integer().min(0).max(20),
    questionFour:  Joi.number().integer().min(0).max(20),
    questionFive:  Joi.number().integer().min(0).max(20),
    questionSix:  Joi.number().integer().min(0).max(20),
    questionSeven:  Joi.number().integer().min(0).max(20),
    questionEight:  Joi.number().integer().min(0).max(20),
    questionNine:  Joi.number().integer().min(0).max(20),
    questionTen:  Joi.number().integer().min(0).max(20),
    questionEleven:  Joi.number().integer().min(0).max(20),
    questionTwelve:  Joi.number().integer().min(0).max(20)
  }).error(_ => {throw new BadRequestError('client has issued a malformed or illegal request')})

  console.log('after joi validation in screener validate')

  await schema.validateAsync(req.body, {abortEarly: true})
    .then(data => sanitize(req.body, data))
  
    next()
}




module.exports = {validateRegistration, validateLogin, validateScreenerAnswers, validateGameState}


