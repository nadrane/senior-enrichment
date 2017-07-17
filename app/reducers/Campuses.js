import axios from "axios";

const CREATE_CAMPUS = 'CREATE_CAMPUS'
const READ_CAMPUSES = 'READ_CAMPUSES';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const DEL_CAMPUS = 'DEL_CAMPUS';

const createCampus = campus => ({type: CREATE_CAMPUS, campus});
const readCampuses = campuses => ({ type: READ_CAMPUSES, campuses });
const updateCampus = campusId => ({type: UPDATE_CAMPUS, campusId});
const deleteCampus = campusId => ({ type: DEL_CAMPUS, campusId });

export default function reducer(campuses = [], action) {
  switch (action.type) {
    case CREATE_CAMPUS:
      return [action.campuses, ...campuses]

    case READ_CAMPUSES:
      return action.campuses;

      case UPDATE_CAMPUS:
        return campuses.map(campus => (
        action.campus.id === campus.id ? action.campus : campus // very succinct
      ))

    case DEL_CAMPUS:
      return campuses.filter(campus => {
        return campus.id !== action.campusId; // very succinct
      });
    default:
      return campuses;
  }
}

export const fetchCampuses = ()  => dispatch => {
    axios.get('/api/campus')
        .then(res => dispatch(readCampuses(res.data)))
        //Forgot to catch errors
}

export const addCampus = (campus) => dispatch => {
  axios.post('/api/campus', campus )
    .then(res => res.date)
    .then(campus => dispatch(createCampus(campus)))
    .catch(err => console.error(`Creating Student: ${campus} unsuccesful`, err))
}

export const editCampus = (id, campus) => dispatch => {
  axios.put(`/api/campus/${id}`, campus)
       .then(res => dispatch(updateCampus(res.data)))
       .catch(err => console.error(`Updating campus: ${campus} unsuccesful`, err));
};

export const removeCampus = id => dispatch => {
  dispatch(deleteCampus(id));  // Is it a good idea to delete on the front end before verifying the delete was successful on the backend?
  axios.delete(`/api/campus/${id}`)
       .catch(err => console.error(`Removing campus: ${id} unsuccesful`, err));
}
