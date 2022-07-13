
/**
 *  @params {*string}  name  👉 the page we're navigation to
 *  @params {*string}  msg    👉 the msg return from server
 */
 const getRedirectMsg = (payload) =>{

    let ajaxLoader = true
    let primaryMsg =''
    let secondaryMsg = ''
    const {name, msg} = payload

  if(name === 'login'){
    primaryMsg = 'Login Successful'
    secondaryMsg = 'please wait a moment while we retrieve your files'
  }
  else if(name == 'waiting'){
    primaryMsg = 'Thank you for your participation'
    secondaryMsg = 'please wait a moment while we determine your results'
  }
  else if (name === 'result'){
    primaryMsg = 'Your Results are'
    secondaryMsg = msg
    ajaxLoader = false
  }
  else{
    ajaxLoader = true
    primaryMsg = 'NOT WORKING'
    secondaryMsg = `[ ${name} ] is not a valid Input`
  }

  return {ajaxLoader, primaryMsg, secondaryMsg}
}


export default getRedirectMsg