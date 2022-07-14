require('dotenv').config()
require('express-async-errors')

const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const passport = require('passport')
const session = require('express-session')
const {corsOptions} = require('./config/cors.js')
const {sessionOptions} = require('./config/session')

//SERVER
const server = express()

//global middleware
server.use(express.json())
server.use(cors(corsOptions))
server.use(morgan(':date[web'))
server.use(session(sessionOptions))

//passport setup
require('./config/passport')        //must come after session setup, since Passport relies on the `express-session` 
server.use(passport.initialize())   //on each request, checks if req.session.passport.user object exist, then save it to internal Passport method for later.
server.use(passport.session())      //uses the user property found on req.session.passport.user to re-initialize user via the passport.deserializeUser() 
                                    //then assigned the user object to the `req` object` to be can be accessed within the route 

//routes
server.use('/api/v3/auth', require('./routes/auth'))
server.use('/api/v3/user', require('./routes/user'))
server.use('/api/v3/game', require('./routes/games'))

//404 Error && error handling
server.use(require('./middleware/not-found'))
server.use(require('./middleware/error-handler'))


//server listening
server.listen(process.env.DEV_PORT, [process.env.IP_ADDRESS, 'localhost'], err =>{
   if(err)console.log(`Internal Server Error ${err.message}`)   
   console.log(`\nServer running on ${process.env.DEV_PORT}`)
})
