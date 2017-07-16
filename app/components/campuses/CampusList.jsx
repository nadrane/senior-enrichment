import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addCampus } from '../../reducers/campuses'
import CampusItem from './CampusItem'

/* -----------------    COMPONENT     ------------------ */

class CampusList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      imgUrl: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    return (
    <div>
        <div className="columns is-multiline campuslist">
            {
            this.props.campuses
                .map(campus => 
                <div className="column" key={campus.id}>
                    <CampusItem campus={campus} />
                </div>
                )
            }
        </div>
            <br/>
        <div className="addCampus">
            <br/>
            Add A Campus!
            <form onSubmit={this.handleSubmit}>
                <div className="field">
                    <label className="label">Name</label>
                    <p className="control">
                        <input
                            className="input"
                            type="text"
                            name="name"
                            onChange={evt => this.setState({ name: evt.target.value })}
                            placeholder="Campus name"
                        />
                    </p>
                </div>
                <div className="field">
                    <label className="label">Link to an image!</label>
                    <p className="control">
                        <input
                            className="input"
                            type="text"
                            name="imgUrl"
                            onChange={evt => this.setState({ imgUrl: evt.target.value })}
                            placeholder="Image URL"
                        />
                    </p>
                </div>
                <button className="button is-primary" type="submit">Submit</button>
            </form>
        </div>
    </div>
    );
  }

  handleSubmit(event){
    event.preventDefault();
    let name = this.state.name
    let imgUrl = this.state.imgUrl

    //If no URL is provided, we want Sequelize to use the model's default
    imgUrl === '' ? this.props.addCampus({name}) : this.props.addCampus({name, imgUrl})

    
    // clear the inputs
    event.target.name.value = '';
    event.target.imgUrl.value = '';
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ campuses }) => ({ campuses });
const mapDispatch = { addCampus };
export default connect(mapState, mapDispatch)(CampusList);
