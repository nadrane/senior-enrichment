import React from "React";
import { Link } from 'react-router-dom'

class Teams extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
     <div className="row">
        <div className="col-sm-3">
          <div className="thumbnail">
          <Link to="/players">
            <img src="/images/test.jpg" />
            </Link>
              <div className="caption">
                <p>Patriots</p>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Teams;
