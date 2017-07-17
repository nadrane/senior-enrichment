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
    this.submitEdit = this.submitEdit.bind(this)
    this.submitStudent = this.submitStudent.bind(this)
  }

  submitEdit(event){
    event.preventDefault();
    const name = event.target.name.value
    const imgUrl = event.target.imgUrl.value
    const campusId = this.props.match.params.campusId

    imgUrl === '' ? this.props.updateCampus(campusId, {name}) : this.props.updateCampus(campusId, {name, imgUrl})


    //Clear the form
    event.target.name.value = '';
    event.target.imgUrl.value = '';
  }

  submitStudent(event){
    event.preventDefault();
    const name = event.target.name.value
    const imgUrl = event.target.imgUrl.value
    const campusId = this.props.match.params.campusId

    imgUrl === '' ? this.props.addStudent({name, campusId}) : this.props.addStudent({name, imgUrl, campusId})

    //Clear the form
    event.target.name.value = '';
    event.target.imgUrl.value = '';
  }

  render() {
  const {campus, students} = this.props
  if (!campus) return <div />
   return (
    <div> 
       <section className="hero">
         <div className="hero-body">
           <div className="container">
             <h1 className="title">
               {campus.name}
            </h1>
            <img src={campus.imgUrl}/>
           </div>
         </div>
       </section>
        <div className="columns is-multiline studentlist">
          {students
            .filter(student => student.campusId === campus.id)
            .map(student => 
              <div className="column" key={student.id}>
                <StudentItem student={student} key={student.id}/>
              </div>
              )}
        </div>
      <div className="columns">
        <div className="addCampus column forms">
            <br/>
              Edit Campus
                  <form onSubmit={this.submitEdit}>
                      <div className="field">
                          <label className="label">Name</label>
                          <p className="control">
                              <input
                                  className="input"
                                  type="text"
                                  name="name"
                                  placeholder="Campus name"
                              />
                          </p>
                      </div>
                      <div className="field">
                          <label className="label">Link to an image!</label>
                          <p className="control">
                              <input
                                  className="input"
                                  type="text"
                                  name="imgUrl"
                                  placeholder="Image URL"
                              />
                          </p>
                      </div>
                      <button className="button is-primary" type="submit">Submit</button>
                  </form>
          </div>
          <div className="addCampus column forms">
            <br/>
              Add A Student!
                  <form onSubmit={this.submitStudent}>
                      <div className="field">
                          <label className="label">Name</label>
                          <p className="control">
                              <input
                                  className="input"
                                  type="text"
                                  name="name"
                                  placeholder="Student name"
                              />
                          </p>
                      </div>
                      <div className="field">
                          <label className="label">Link to an image!</label>
                          <p className="control">
                              <input
                                  className="input"
                                  type="text"
                                  name="imgUrl"
                                  placeholder="Image URL"
                              />
                          </p>
                      </div>
                      <button className="button is-primary" type="submit">Submit</button>
                  </form>
          </div>
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

const mapDispatch = { addStudent, updateCampus };

export default connect(mapState, mapDispatch)(CampusDetail);
