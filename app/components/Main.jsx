//Dependencies
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import store from '../store'

//State setting thunks
import { fetchCampuses } from '../reducers/campuses';
import { fetchStudents } from '../reducers/students';

//Static React Components
import Nav from './Nav';
import Home from './Home'


//Stateful React Components
import CampusDetail from './campuses/CampusDetail'
import CampusItem from './campuses/CampusItem';
import CampusList from './campuses/CampusList';
import StudentDetail from './students/StudentDetail'
import StudentItem from './students/StudentItem';
import StudentList from './students/StudentList';


export default class Main extends Component {
  // How might this model of always grabbing all the data scale?
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
            <Route exact path="/home" component={Home}/>
            <Route exact path="/campuses" component={CampusList}/>
            <Route exact path="/students" component={StudentList}/>
            <Route path="/campuses/:campusId" component={CampusDetail} />
            <Route path="/students/:studentId" component={StudentDetail} />
          </Switch>
        </main>
      </div>
    );
  }
}