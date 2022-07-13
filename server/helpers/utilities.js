const { NoContentError } = require("../errors")

const isEmpty = result =>  {
  if (result == null) 
    throw new NoContentError()
  else
    return false
}

module.exports = {isEmpty}

