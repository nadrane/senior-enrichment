import axios from 'axios';
/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_CAMPUSES';
const CREATE     = 'CREATE_CAMPUS';
export const REMOVE = 'REMOVE_CAMPUS';
const UPDATE     = 'UPDATE_CAMPUS';


/* ------------   ACTION CREATORS     ------------------ */

const init  = campuses => ({ type: INITIALIZE, campuses });
const create = campus => ({ type: CREATE, campus });
const remove = id    => ({ type: REMOVE, id });
const update = campus => ({ type: UPDATE, campus });


/* ------------       REDUCER     ------------------ */

export default function reducer (campuses = [], action) {
  switch (action.type) {
    case INITIALIZE:
      return action.campuses;
    case CREATE:
      return [action.campus, ...campuses];
    case REMOVE:
      return campuses.filter(campus => campus.id !== action.id); // nice! very clean
    case UPDATE:
      return campuses.map(campus => (
        action.campus.id === campus.id ? action.campus : campus  // nice! very clean
      ));
    default:
      return campuses;
  }
}


/* ------------   THUNK CREATORS     ------------------ */

export const fetchCampuses = () => dispatch => {
  axios.get('/api/campus')
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error('Error fetching campuses', err));
};


export const removeCampus = id => dispatch => {
  dispatch(remove(id)); //I would only do this after getting success from the server
  //What if the delete failed?
  axios.delete(`/api/campus/${id}`)
       .catch(err => console.error(`Removing campus: ${id} unsuccesful`, err));
};

export const addCampus = campus => dispatch => {
  axios.post('/api/campus', campus)
       .then(res => {
         dispatch(create(res.data))
        })
       .catch(err => console.error(`Creating campus: ${campus} unsuccesful`, err));
};

export const updateCampus = (id, campus) => dispatch => {
  axios.put(`/api/campus/${id}`, campus)
       .then(res => dispatch(update(res.data)))
       .catch(err => console.error(`Updating campus: ${campus} unsuccesful`, err));
};


