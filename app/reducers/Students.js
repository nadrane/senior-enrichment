import axios from "axios";

const CREATE_STUDENT = 'CREATE_STUDENT'
const READ_STUDENTS = 'READ_STUDENTS';
const UPDATE_USER = 'UPDATE_USER';
const DEL_STUDENT = 'DEL_STUDENT';

const createStudent = students => ({type: CREATE_STUDENT, students});
const readStudents = students => ({ type: READ_STUDENTS, students });
const updateStudent = studentId => ({type: UPDATE_USER, studentId});
const deleteStudent = studentId => ({ type: DEL_STUDENT, studentId });

export default function reducer(students = [], action) {
  switch (action.type) {
    case CREATE_STUDENT:
      return [action.students, ...students]

    case READ_STUDENTS:
      return action.students;

      case UPDATE_USER:
        return students.map(student => (
        action.student.id === student.id ? action.student : student
      ))
    case DEL_STUDENT:
      return students.filter(student => {
        return student.id !== action.studentId;
      });
    default:
      return students;
  }
}

export const fetchStudents = () => dispatch => {
    axios.get('/api/students')
        .then(res => dispatch(readStudents(res.data)))
}

export const addStudent = (student) => dispatch => {
  axios.post('/api/students', student )
    .then(res => res.date)
    .then(student => dispatch(createStudent(student)))
    .catch(err => console.error(`Creating Student: ${student} unsuccesful`, err))
}

export const editStudent = (id, student) => dispatch => {
  axios.put(`/api/students/${id}`, student)
       .then(res => dispatch(updateStudent(res.data)))
       .catch(err => console.error(`Updating Student: ${student} unsuccesful`, err));
};

export const removeStudent = id => dispatch => {
  console.log('this ran')
  dispatch(deleteStudent(id));
  axios.delete(`/api/students/${id}`)
       .catch(err => console.error(`Removing student: ${id} unsuccesful`, err));
};