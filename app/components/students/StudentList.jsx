import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeStudent } from '../../reducers/students'
import StudentItem from './StudentItem'

class StudentList extends Component{
    constructor(props){
        super(props)
        this.deleteStudent = this.deleteStudent.bind(this) // We don't need to bind this. Mostly because deleteStudent is never invoked anywhere.
    }

    deleteStudent(e){
        const id = e.target.value
        this.props.removeStudent(id) //We never used mapDispatchToProps. This wont exist.
    }

    render(){
        const students = this.props.students
        if (students.length === 0) return(
        <section className="hero">
         <div className="hero-body">
           <div className="container">
             <h1 className="title">
                No students enrolled.
            </h1>
           </div>
         </div>
       </section>)
        return(
        <div className="columns is-multiline campuslist">
            {
            students
                .map(student =>
                <div className="column" key={student.id}>
                    <StudentItem student={student} />
                </div>
                )
            }
        </div>
        )
    }
}

const mapState = ({ students }) => ({ students });

const mapDispatch = { };

export default connect(mapState, mapDispatch)(StudentList);