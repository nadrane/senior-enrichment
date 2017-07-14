import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux';
import {removeStudent} from '../reducers/students'

/* -----------------    COMPONENT     ------------------ */

class SchoolReview extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
      campus: {},
      students: [],
  }
  this.getCampus = this.getCampus.bind(this)
  this.deleteStudent = this.deleteStudent.bind(this)
}

  componentWillReceiveProps(nextProps){
    this.getCampus();
    this.getStudents(nextProps);
  }

  getCampus() {
      const id = this.props.match.params.campusId
      axios.get(`/api/campus/${id}`)
      .then(res => this.setState({campus: res.data}))
      .catch(err => console.error('There was an error getting the campus'))
  }

  getStudents(props){
    const campusId = this.props.match.params.campusId
    var students = props.students.filter(function(student){
        return student.campusId == campusId
    })
    this.setState({students: students})
  }
  
  deleteStudent(e){
    const id = e.target.value
    this.props.removeStudent(id)
  }

  render() {
   return (
       <div> {this.state.campus.name} 
            {this.state.students.map(student => (
                <div key={`/students/${student.id}`}>
                <NavLink to={`/students/${student.id}`}>{student.name}</NavLink>
               <button onClick={this.deleteStudent} value={student.id}>Delete</button>
               </div>
           ))} 
        </div>
    );
  }


}
/* -----------------    CONTAINER     ------------------ */

const mapState = ({ students }) => ({ students });
const mapDispatch = {removeStudent};

export default connect(mapState, mapDispatch)(SchoolReview);
