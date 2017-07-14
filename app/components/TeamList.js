import React from 'react'
import Team from './Team'
import {connect} from 'react-redux'


class TeamList extends React.Component{
    constructor(){
        super()
    }

    render (){
        return (
            <Team teams={this.props.students}/>
        )
    }
}

const mapStatetoProps = ({ students }) => ({ students });
export default connect(mapStatetoProps)(TeamList);
