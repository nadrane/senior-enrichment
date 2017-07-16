import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeStudent } from '../../reducers/students'
import { Card, CardHeader, CardHeaderTitle, CardImage, CardContent, Media, MediaLeft, Icon, Image, Title, Subtitle, MediaContent, CardHeaderIcon, Content} from 'bloomer';


class StudentItem extends React.Component {
    constructor(props) {
        super(props)
        this.onDelete = this.onDelete.bind(this)
    }

    onDelete() {
        this.props.removeStudent(this.props.student.id)
    }
    render() {
        const student = this.props.student
    return(
    <Card>
        <CardHeader>
            <CardHeaderTitle>
                {student.name}
            </CardHeaderTitle>
            <CardHeaderIcon>
                <Icon><span className='fa fa-angle-down'/></Icon>
            </CardHeaderIcon>
        </CardHeader>
        <CardImage>
            <Image isRatio='4:3' src={student.imgUrl} />
        </CardImage>
        <CardContent>
            <Content>
                <small>
                    <NavLink to={`/students/${student.id}`}>
                        <button className="button">Review</button>    
                    </NavLink>
                    <button className="button" onClick={this.onDelete}>Delete</button>
                </small>
            </Content>
        </CardContent>
    </Card>
    )}
}

/* -----------------    CONTAINER     ------------------ */
const mapState = () => ({});
const mapDispatch = { removeStudent };
export default connect(mapState, mapDispatch)(StudentItem);
