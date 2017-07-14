import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TeamsList from "./components/TeamList";
import Root from "./components/Root";
import PlayerList from "./components/Playerlist";
import Home from "./components/Home";
import AddForm from "./components/AddForm";
import { fetchCampuses } from './reducers/Campuses'
import {fetchStudents} from './reducers/students'

export class Routes extends React.Component {
  componentDidMount(){
      this.props.fetchInitialData()
  }
  render() {
    return (
      <Router>
        <Root>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/teams" component={TeamsList} />
            <Route exact path="/players" component={PlayerList} />
            <Route path="/players/add" component={AddForm} />
          </Switch>
        </Root>
      </Router>
    );
  }
}

const mapStatetoProps= null;

const mapDispatchtoProps =  dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchStudents());
    dispatch(fetchCampuses());
  }
});


export default connect(mapStatetoProps, mapDispatchtoProps)(Routes);