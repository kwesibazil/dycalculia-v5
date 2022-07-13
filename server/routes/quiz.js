const express = require('express')
const router = express.Router()

const { controller } = require('../controllers/quiz-controller')
const {checkLoggedIn}  = require('../middleware/authentication')


/** @route /api/v3/quiz*/
router.get('/quiz',  checkLoggedIn, controller.fetchQuiz)
router.post('/evaluate', checkLoggedIn, controller.calculateScore)
module.exports = router
