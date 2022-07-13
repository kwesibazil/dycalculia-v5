const express = require('express')
const router = express.Router()
const { controller } = require('../controllers/game-controller')
const {checkLoggedIn, validRoute}  = require('../middleware/authentication')

/** @route /api/v3/games */



router.get('/games-info',  checkLoggedIn, controller.fetchGames)
router.get('/testimonies', checkLoggedIn, controller.fetchTestimonies)

module.exports = router
