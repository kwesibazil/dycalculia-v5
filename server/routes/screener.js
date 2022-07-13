const express = require('express')
const router = express.Router()

const { controller } = require('../controllers/screener-controller')
const {checkLoggedIn}  = require('../middleware/authentication')
const {validateScreenerAnswers} = require('../middleware/validation')   //👈validation not working Joi expects an object however its receiving something otherwise (proxy object)

/** @route /api/v3/screener*/
router.get('/questions',  checkLoggedIn, controller.fetchQuestions)
router.post('/evaluate',  checkLoggedIn, controller.screen)

module.exports = router
