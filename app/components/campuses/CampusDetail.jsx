import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { addStudent } from '../../reducers/students'
import { updateCampus } from '../../reducers/campuses'
import _ from 'lodash';
import StudentItem from '../students/StudentItem'

/* -----------------    COMPONENT     ------------------ */

class CampusDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  const {campus, students} = this.props
   return (
      <div> 
          <h1>{/*campus.name*/}</h1>
        <div className="columns is-multiline studentlist">
          {students
            .filter(student => student.campusId === campus.id)
            .map(student => 
              <div className="column" key={student.id}>
                <StudentItem student={student} key={student.id}/>
              </div>
              )}
        </div>
      </div>
    );
  }
}
/* -----------------    CONTAINER     ------------------ */

const mapState = ({ students, campuses }, ownProps) => {
  const paramId = Number(ownProps.match.params.campusId);
  return {
    campus: _.find(campuses, campus => campus.id === paramId),
    students
  };
};

const mapDispatch = {};

export default connect(mapState, mapDispatch)(CampusDetail);
