import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addCampus } from '../reducers/campuses'
import SchoolItem from './SchoolItem'

/* -----------------    COMPONENT     ------------------ */

class SchoolList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      imgUrl: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleImgUrlChange = this.handleImgUrlChange.bind(this)
    this.submit = this.submit.bind(this)
  }

  render() {
    return (
    <div className="columns">
        {
          this.props.campuses
            .map(campus => 
            <div className="column">
            <SchoolItem campus={campus} key={campus.id} />
            </div>
            )
        }
        <div className="column addCampus">
            <br/>
            Add A Campus!
            <form onSubmit={this.submit}>
            <div className="field">
                <label className="label">Name</label>
                <p className="control">
                    <input
                        className="input"
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleNameChange}
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
                        value={this.state.imgUrl}
                        onChange={this.handleImgUrlChange}
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
  handleNameChange (evt) {
    this.setState({
        name: evt.target.value})
  }
  handleImgUrlChange (evt) {
    this.setState({
        imgUrl: evt.target.value})
  }

  submit(event){
    event.preventDefault();
    const campus = {
      name: this.state.name,
      imgUrl: this.state.imgUrl
    };
    console.log(campus)
    this.props.addCampus(campus);
    // clear the inputs
    event.target.name.value = '';
    event.target.imgUrl.value = '';
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ campuses }) => ({ campuses });

const mapDispatch = { addCampus };

export default connect(mapState, mapDispatch)(SchoolList);
