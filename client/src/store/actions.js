import axiosInstance from "@/libs/axiosInstance"
import DOMPurify from "dompurify"

export default{

  async fetchTestimonies({commit}){
    try {
      const res = await axiosInstance.get('games/testimonies')
      commit('setResponse', {data: res.data, state: 'testimonies'})
    } catch (err) {
        commit('redirect', {route: 'internal-error', timeOut: 0})   //👈 change this to  reflect results empty
    }
  },

  async fetchGame({commit}) {
    try {
      const res = await axiosInstance.get('games/games-info')
      commit('setResponse', {data: res.data, state: 'games'})
    } catch (err) {
        commit('redirect', {route: 'internal-error', timeOut: 0})   //👈 change this to reflect  results empty
    }
  },

  async fetchQuestions({commit}){
    try {
      const res = await axiosInstance.get('screener/questions')
      commit('setResponse', {data: res.data, state: 'screenerQues'})
    } catch (err) {
        commit('redirect', {route: 'internal-error', timeOut: 0})     //👈 change this to reflect  results empty
    }
  },

  async fetchQuiz({commit}){
    try {
      const res = await axiosInstance.get('math-quiz/quiz')
      commit('setResponse', {data: res.data, state: 'quizzes'})
    } catch (err) {
        commit('redirect', {route: 'internal-error', timeOut: 0})     //👈 change this to reflect  results empty
    }
  },


  async submitQuestions({commit}){
    try { 
      const res = await axiosInstance.post('screener/evaluate', this.state.screener.answers)
      commit('updateUser', {data: res.data.results, prop:'status'})
      commit('redirectMsg', {name:'waiting'})
      commit('toggleModal', 'success')
      commit('redirect', {route: 'games', timeOut: 3000})
      setTimeout(_ =>{
        commit('redirectMsg', {name:'result', msg: res.data.results})
      },3000)
    } catch (err) {
        commit('redirect', {route: 'internal-error', timeOut: 0})           //👈 change this reflect server error
    }
  },

  async submitQuiz({commit, state}){
    try {
      const res = await axiosInstance.post('math-quiz/evaluate', this.state.mathQuiz.quizAnswers)
      commit('updateUser', {data: res.data.results, prop:'quiz'})
      commit('redirectMsg', {name:'waiting'})
      commit('toggleModal', 'success')
      commit('redirect', {route: 'games', timeOut: 3000})
      setTimeout(_ =>{
        commit('redirectMsg', {name:'result', msg: res.data.results})
      },3000)
    } catch (err) {
        commit('redirect', {route: 'internal-error', timeOut: 0})           //👈 change this reflect server error
    }
  },

  async postScore({commit}, payload){
    try {
      const title = DOMPurify.sanitize(payload.game);
      const score = parseInt(DOMPurify.sanitize(payload.score));
      const res = await axiosInstance.post('user/gameStats', {title, score})
    } catch{}
  }


}//export ends here
// use to access state in another module console.log(this.state.<module>.<state>);