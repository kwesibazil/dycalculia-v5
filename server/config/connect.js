require('dotenv').config()
const mongoose = require('mongoose')
const {ConnectError} = require('../errors')


const connect  = mongoose.connect(process.env.DEVELOPMENT_DATABASE, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(conn => conn.connection.getClient())
  .catch(err => {throw new ConnectError(err.message)})

module.exports = {connect};
