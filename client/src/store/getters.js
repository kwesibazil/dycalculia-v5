export default{
  getState: state => payload => state[payload],
  isVisible: state => payload => state[payload],
  getUser: state  => payload => state.user[payload],
  getObjState: state => payload => state[payload.obj][payload.prop]
}