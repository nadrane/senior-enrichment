import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home'
import SchoolList from'./SchoolList'
import StudentList from './StudentList'
import SchoolReview from './SchoolReview'
import store from '../store'
import { fetchCampuses } from '../reducers/campuses';
import { fetchStudents } from '../reducers/students';


export default class Main extends Component {

  componentDidMount () {
    const campusesThunk = fetchCampuses();
    const studentsThunk = fetchStudents();
    store.dispatch(campusesThunk);
    store.dispatch(studentsThunk);
  }

  render () {
    return (
      <div>
        <Nav />
        <main>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/campuses" component={SchoolList}/>
            <Route exact path="/students" component={StudentList}/>
            <Route path="/campuses/:campusId" component={SchoolReview} />
            <Route path="/students/:studentId" component={Home} />

          </Switch>
        </main>
      </div>
    );
  }
}