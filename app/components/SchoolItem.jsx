import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeCampus } from '../reducers/campuses'
import { Card, CardHeader, CardHeaderTitle, CardImage, CardContent, Media, MediaLeft, Icon, Image, Title, Subtitle, MediaContent, CardHeaderIcon, Content} from 'bloomer';


class SchoolItem extends React.Component {
    constructor(props) {
        super(props)
        this.onDelete = this.onDelete.bind(this)
    }

    onDelete() {
        this.props.removeCampus(this.props.campus.id)
    }

    render() {
    return(
 <Card key={this.props.key}>
    <CardHeader>
        <CardHeaderTitle>
            {this.props.campus.name}
        </CardHeaderTitle>
        <CardHeaderIcon>
            <Icon><span className='fa fa-angle-down'/></Icon>
        </CardHeaderIcon>
    </CardHeader>
    <CardImage>
        <Image isRatio='4:3' src={this.props.campus.imgUrl} />
    </CardImage>
    <CardContent>
        <Content>
            <small>
                <NavLink to={`/campuses/${this.props.campus.id}`}>
                    <a className="button">Review</a>    
                </NavLink>
                <button className="button" onClick={this.onDelete}>Delete</button>
            </small>
        </Content>
    </CardContent>
</Card>
    )}
}

/* -----------------    CONTAINER     ------------------ */
const mapState = ({ campuses }) => ({ campuses });
const mapDispatch = { removeCampus };
export default connect(mapState, mapDispatch)(SchoolItem);
