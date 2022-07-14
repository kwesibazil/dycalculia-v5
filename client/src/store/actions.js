import axiosInstance from "@/libs/axiosInstance"
import DOMPurify from "dompurify"

export default{

  async fetchGame({commit}) {
    try {
      const res = await axiosInstance.get('game/all')
      commit('setResponse', {data: res.data, state: 'games'})
    } catch (err) {
        commit('redirect', {route: 'internal-error', timeOut: 0})   //👈 change this to reflect  results empty
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