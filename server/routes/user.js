const express = require('express')
const router = express.Router()
const { controller } = require('../controllers/user-controller')
const {checkLoggedIn,}  = require('../middleware/authentication')


/** @route /api/v3/user */
router.post('/gameStats',  checkLoggedIn, controller.postStats)
module.exports = router
