import router from '@/router/index'
import getRedirectMsg from '@/libs/feedback'

export default{
  resetModal (state) {
    state.modal.current = null
    state.modal.isActive = null
  },

  setCurrentModal(state, current){
    state.modal.current = current
  },

  toggleModal(state, modal){
    state.modal.isActive = !state.modal.isActive
    state.modal.current= modal
  },

  toggleSideNav (state, collapse) {
    if(collapse || window.innerWidth < 768){
      state.sideNav = !state.sideNav
      const body = document.querySelector("body")
      body.classList.toggle('overflow-hidden')
    }
  }, 
  
  
  redirectMsg(state, payload){
    const {ajaxLoader, primaryMsg, secondaryMsg} = getRedirectMsg(payload)
    state.redirectMsg.primaryMsg = primaryMsg
    state.redirectMsg.secondaryMsg = secondaryMsg
    state.ajaxLoader = ajaxLoader
  },


  async redirect(state, payload){
    setTimeout(_ => router.push({name:payload.route}), payload.timeOut)
  },

  setResponse(state, res){
    state[res.state] = res.data
  },

  updateUser(state, payload){
    state.user[payload.prop] = payload.data
  }
}//export ends here
