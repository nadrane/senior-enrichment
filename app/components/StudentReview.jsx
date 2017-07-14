import React from 'react';
import { connect } from 'react-redux'
import { setStudent } from '../reducers/currentStudent'


class StudentReview extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            student: {},
            name: '',
            email: '',
            imgUrl: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleImgUrlChange = this.handleImgUrlChange.bind(this)
    }

    componentDidMount(){
        setStudent(this.props.match.params.studentId)
    }
    handleSubmit(e){
        updateStudent(this.props.currentStudent.id, {
            name: e.target.name,
            campusId: e.target.campusId,
            email: e.target.email,
            imgUrl: e.target.imgUrl
        })
        this.setState({
            name: '',
            email: '',
            imgUrl: '',
        })
    }

    handleNameChange(e){
        this.setState({name: e.target.value})
    }
    handleEmailChange(e){
        this.setState({email: e.target.value})
    }
    handleImgUrlChange(e){
        this.setState({imgUrl: e.target.value})
    }
    

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                 <input
                    className="input"
                    type="text"
                    name="name"
                    value={this.props.currentUser.name}
                    onChange={this.handleNameChange}
                    placeholder="Name"
                />
                <input
                    className="input"
                    type="text"
                    name="email"
                    value={this.props.currentUser.email}
                    onChange={this.handleEmailChange}
                    placeholder="Email"
                />
                 <input
                    className="input"
                    type="text"
                    name="imgUrl"
                    value={this.props.currentUser.imgUrl}
                    onChange={this.handleImgUrlChange}
                    placeholder="Image URL"
                />
            </form>
        )
    }
}

const mapState = ({ students }) => ({ students });
const mapDispatch = {updateStudent};

export default connect(mapState, mapDispatch)(SchoolReview);
