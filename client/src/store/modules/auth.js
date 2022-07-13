import axiosInstance from "@/libs/axiosInstance"
``
export default{
  state: {
    err: null,
    errMsg: null,
    signInModal: null,            //👈 true = signIn form || false = signUp form  
  },

  getters: {
    getAuthState: state => prop => state[prop]
  },

  mutations: {
    swapAuthForm(state, form){
      state.signInModal = (form === 'signIn') ? true : false
    },

    closeAuthErr(state){
      state.err = false
      state.errMsg = null
    },

    setErrMsg(state, msg){
      state.err = true
      state.errMsg = msg
    }

  },
  
  actions: {
    async loginStatus({commit}){
      try {
        const res = await axiosInstance.get('auth/login-status')
        return res.data.isAuthenticated
      }catch {} //👈 used catch block
    },

    async logout({commit}){
      try {
        await axiosInstance.delete('auth/logout')
        commit('redirect', {route: 'welcome', timeOut: 100}, {root: true})
      }catch{} //👈 used catch block
    },


    async register({commit, dispatch}, payload){
      try {
        const formData = {
          pwd: payload.pwd,
          email: payload.email
        }
        await axiosInstance.post('auth/register', formData)
        dispatch('login', payload)
      } catch (err) {
          commit('setErrMsg', err.response.data.err)
      }
    },

    async login({commit}, payload){
      try {
        const formData = {pwd: payload.pwd, email: payload.email }
        const res = await axiosInstance.post('auth/login', formData)
        commit('redirectMsg', {name:'login'},{root: true})
        commit('redirect', { route: 'dashboard', timeOut: 1500},{root: true})
        commit('setResponse', {data: res.data, state: 'user'},{root: true})
        commit('setCurrentModal', 'success')                //👈changes the current modal
      }catch (err) {
        commit('setErrMsg', err.response.data.err)
      }
    }
  }//actions ends here
}//export ends here


// use to access state in another module console.log(this.state.<module>.<state>);