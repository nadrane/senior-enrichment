import { combineReducers } from 'redux';
import campuses from './campuses.js';
import students from './students.js';

export default combineReducers({students, campuses});
