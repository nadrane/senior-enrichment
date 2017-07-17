import React from "react";
import PlayerList from "./PlayerList";
import { addStudent } from "../reducers/students";
import {connect} from 'react-redux'

//Super ambiguous name. AddStudent perhaps?
class AddForm extends React.Component {
  constructor() {
    super();
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onSubmitHandler(e) {
    e.preventDefault()
    console.log(e.target.team.key)
    this.props.addStudent({
      name: e.target.name.value,
      email: e.target.email.value,
      campusId: e.target.team.key
    });
  }


  render() {
    return (
      <div>
        <div>
          <form id="addForm" onSubmit={this.onSubmitHandler}>
            <div className="form-group">
              <label>Add</label>
              <input type="Name" name="name" placeholder="Name here" />
            </div>
            <div className="form-group">
              <label>email</label>
              <input type="Name" name="email" placeholder="Name here" />
            </div>
            <div className="form-group">
              <label>Select Team</label>
              <select name="team" className="form-control">
              <option key={1}>Patriots</option>
              {this.props.campuses.map(campus => {
                return <option key={campus.id}>{campus.name}</option>
              })}
              </select>
            </div>
            <button className="btn">Submit</button>
          </form>
        </div>

        <PlayerList />
      </div>
    );
  }
}

const mapStateToProps = ({campuses}) => ({campuses})
const mapDispatchToProps = { addStudent };

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
