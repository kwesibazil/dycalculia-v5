import VuexPersistence from 'vuex-persist'


const vuexSession = new VuexPersistence({
  storage: window.sessionStorage,           //👈 storage location
  reducer: state => ({                      //👈 reducer will overwrite the persisted state  if declare in module
    user: state.user,                      
    games: state.games,         
    quizzes: state.quizzes,
    testimonies: state.testimonies,
    screenerQues: state.screenerQues
  }),   
  filter: mutation => mutation.type == 'setResponse' || mutation.type == 'updateUser' //👈 will only trigger store save on these mutations 
})

export {vuexSession}
