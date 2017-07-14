import axios from 'axios';

/* Action */
const SET = 'SET_CURRENT_STUDENT'
const QUIT = 'QUIT_CURRENT_STUDENT'

/*Action Creator*/
export const set = user => ({type: SET, user})
export const quit = () => ({type: QUIT})

/*Reducer*/
export default function reducer (currentStudent = {}, action) {
  switch (action.type) {
    case SET:
      return action.user;
    case QUIT:
        return {}
    default:
      return currentUser
  }
}

/*Thunk*/
export const setStudent = (id) => dispatch => {
    axios.get(`/student/${id}`)
    .then(res => set(res.data))
    .catch(err => console.error('Error setting student', err))
}
