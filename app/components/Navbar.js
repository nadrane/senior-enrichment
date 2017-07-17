import React from "React";
import { NavLink } from 'react-router-dom';
class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <NavLink className="navbar-brand" to="/">
              Fantasy Footbal Helper
            </NavLink>
          </div>
          <ul className="nav navbar-nav">
            <li className="active">
              <NavLink to="/teams">Teams</NavLink>
            </li>
            <li>
             {/* why are we using NavLink */}
              <NavLink to="/players">Players</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
