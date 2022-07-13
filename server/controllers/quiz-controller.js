const Quiz = require('../models/quiz-model')
const Score = require('../models/scores-model')

const {StatusCodes} = require('http-status-codes')
const {isEmpty} = require('../helpers/utilities')

const fetchQuiz = async (req, res) =>{
  const result = await Quiz.find({}).select(['-answer', '-_id']).limit()
  if(!isEmpty(result))
    res.status(StatusCodes.OK).json(result)  
}


const calculateScore = async (req, res) =>{
  let total = 0
  let score = 0
  const points = 10

  const answers = req.body
  const quizzes = await Quiz.find({}).select(['answer','name', '-_id']).limit()

  for (const answer in answers) {
    quizzes.forEach(quiz => {
      if(answer === quiz.name){
        if(answers[answer] == quiz.answer){
          score += points                         //👈 10 of points awarded for each question correct answer\
        }
      total += points
      }
    })                                                           
  } 

  const percent = (score / total) * 100
  score = `${score}/${total}`                    //👈 CAUTION score is being converted to a String, ensure this operation follow after finish calulating percentage 


  const newScore = new Score({                  //👈 create a new score and add it to the database for analysis
    user_id: req.session.passport.user,
    username: req.user.email,
    percent: percent,
    score: score
  })

  newScore.save()
    .then(_ => res.status(StatusCodes.CREATED).json({results: score}))
    .catch(err => {res.status(StatusCodes.BAD_REQUEST).json({err: 'failed to calculate score'})})
}


const controller = {fetchQuiz, calculateScore }
module.exports = {controller}


