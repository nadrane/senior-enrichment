import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { updateStudent } from '../../reducers/students'
import _ from 'lodash';

/* -----------------    COMPONENT     ------------------ */

class StudentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.submitEdit = this.submitEdit.bind(this)
  }

  submitEdit(event){
    event.preventDefault();
    const studentId = this.props.match.params.studentId
    const name = event.target.name.value
    const imgUrl = event.target.imgUrl.value
    const email = event.target.email.value
    const campusId = event.target.campus.value

    imgUrl === '' ? this.props.updateStudent(studentId, {name, campusId, email}) : this.props.updateStudent(studentId, {name, imgUrl, campusId, email})


    //Clear the form
    event.target.name.value = '';
    event.target.imgUrl.value = '';
  }

  //This is quite long. It would stand to be split into multiple components.
  render() {
  const {student, campuses} = this.props
  if (!student) return <div />
  //Find is actually on the array.prototype
  const campus = _.find(campuses, campus => campus.id == student.campusId)
   return (
    <div>
       <section className="hero">
         <div className="hero-body">
           <div className="container">
             <h1 className="title">
               {student.name} from <NavLink to={`/campuses/${campus.id}`}> {campus.name} </NavLink> <br />
               Email: {student.email}
            </h1>
            <img src={student.imgUrl}/>
           </div>
         </div>
       </section>
      <div className="columns">
        <div className="addCampus column forms">
            <br/>
              Edit Student Information
                  <form onSubmit={this.submitEdit}>
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
                          <label className="label">Email</label>
                          <p className="control">
                              <input
                                  className="input"
                                  type="text"
                                  name="email"
                                  placeholder="Student Email"
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
                      <div className="field">
                          <label className="label">School Assignment</label>
                          <p className="control">
                              <span className="select">
                                  <select name="campus">
                                      {
                                          campuses.map(campus =>
                                              <option key={campus.id} value={campus.id}>{campus.name}</option>
                                          )
                                      }
                                  </select>
                              </span>
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
  const paramId = Number(ownProps.match.params.studentId);
  const student = _.find(students, student => student.id === paramId);
  return {student, campuses};
};

const mapDispatch = { updateStudent };

export default connect(mapState, mapDispatch)(StudentDetail);
