const {StatusCodes} = require('http-status-codes')
const {isEmpty} = require('../helpers/utilities')
const Decimal = require('decimal.js-light');

const Question = require('../models/question-model.js')
const User = require('../models/user-model')


const fetchQuestions = async (req, res) =>{
  const result = await Question.find({}).select(['-_id', '-rank', '-points', '-frequency']).limit()
  if(!isEmpty(result))
    res.status(StatusCodes.OK).json(result)  
}


const screen = async (req, res) =>{
  let prognosis = ''
  let score = new Decimal(0)
  const answers = req.body
  const questions = await Question.find({}).select(['-_id']).limit()

  for (const answer in answers) {
    questions.forEach(question => {
      if(answer === question.name)
        score = score.plus(question.frequency[answers[answer]])    //👈 num of points awarded for each question is different
    })                                                            // the number of points to be awarded is hard coded and 
  }                                                               // stored in the questions collections under fequency 

  if(score <= 25)
    prognosis = 'Not Dyscalculic'                 //👈ONLY ACCEPTS CERTAIN VALUES [ENUM]
  else if(score > 25 && score <= 50)
    prognosis = 'Low Dyscalculic'                 //👈CHECK USER MODEL FOR VALID VALUE [ENUM]
  else if(score > 50 && score <= 75)
    prognosis = 'Moderate Dyscalculic'            //👈CHANGES TO VALUES MUST ALSO BE REFLECTED IN USER SCHEMA 
  else
    prognosis = 'High Dyscalculic'                //👈VALID VALUES ARE ALSO CASE SENSITIVE SO BE CAREFUL


  User.findById(req.session.passport.user, (err, user) =>{
    if(err)
      res.status(StatusCodes.NOT_FOUND).json({"err": "user not found"})
    
    user.prognosis = prognosis                      //👈updates users
    user.save()
    .then(_ => res.status(StatusCodes.OK).json({results: prognosis}))
    .catch(err => res.status(StatusCodes.BAD_REQUEST).json({"err": "not a valid enum value"}))
  })  
}

const controller = {fetchQuestions, screen}
module.exports = {controller}

