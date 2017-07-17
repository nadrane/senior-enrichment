import React from "react";
import {Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {removeStudent} from '../reducers/Students'
class StudentList extends React.Component {
  constructor() {
    super();
    this.onClickHandler = this.onClickHandler.bind(this)
    }

  //Technically no need to bind this the way it's written since "this" is not referenced.
  onClickHandler(e){
    console.log(e)
    //This is referencing the importing removeStudent thunk, not the one mapped to dispatch.
    removeStudent(e.target.id)
  }

  render() {
    return (
      <div>
      <Link to="/players/add">
        <button className="btn">+</button>
      </Link>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Player Name</th>
              <th>Team</th>
            </tr>
          </thead>

          {this.props.students.map(player => {
            return (
              <tr className="table" >
                <td key={player.id}>
                  {player.id}
                </td>
                <td key={player.name}>
                  {player.name}
                </td>
                <td key={player.team}>
                  {player.team}
                </td>
                <td>
                  <button onClick={this.onClickHandler} >X</button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}

const mapStatetoProps = ({students}) => ({students})
const mapDispatchToProps = ({removeStudent}) => ({removeStudent})

export default connect(mapStatetoProps, mapDispatchToProps)(StudentList)
