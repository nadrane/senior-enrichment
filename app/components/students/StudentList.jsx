import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeStudent } from '../../reducers/students'

class StudentList extends Component{
    constructor(props){
        super(props)
        this.deleteStudent = this.deleteStudent.bind(this)
    }
    
    deleteStudent(e){
        const id = e.target.value
        this.props.removeStudent(id)
    }

    render(){
        return(
        <div> 
            {this.props.students.map(student => (
                <div key={student.id}>
                    <NavLink to={`/students/${student.id}`}>{student.name}</NavLink>
                    <button onClick={this.deleteStudent} value={student.id}>Delete</button>
                </div>
            ))}
        </div>)
    }
}

const mapState = ({ students }) => ({ students });

const mapDispatch = { removeStudent };

export default connect(mapState, mapDispatch)(StudentList); 