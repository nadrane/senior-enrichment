import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';


/* -----------------    COMPONENT     ------------------ */

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
      <nav className="nav has-shadow" id="top">
        <div className="container">
          <div className="nav-left">
            <img src="/images/icon.png" />
            <h1 className="navTitle">Nick Surveillance Academy</h1>
          </div>
          <span className="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div className="nav-right nav-menu">
            <NavLink to="/home" className="nav-item is-tab" activeClassName="is-active">
              Home
            </NavLink>
            <NavLink to="/campuses/" className="nav-item is-tab" activeClassName="is-active">
              Campuses
            </NavLink>
            <NavLink to="/students/" className="nav-item is-tab" activeClassName="is-active">
              Students
            </NavLink>
          </div>
        </div>
      </nav>
        )
    }
}

