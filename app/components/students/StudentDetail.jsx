import React from 'react';
import { connect } from 'react-redux'


class StudentDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            imgUrl: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleImgUrlChange = this.handleImgUrlChange.bind(this)
    }

    componentDidMount(){
        setStudent(this.props.match.params.studentId)
        this.setState(this.props.currentStudent)
    }

    handleSubmit(e){
        updateStudent(this.props.match.params.studentId, {
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
        
    return (
            <div>
            <box>Name: {this.props.currentStudent.name}
                Email: {this.props.currentStudent.email}
                Campus: {this.props.currentStudent.campusId}
                <img src={this.props.currentStudent.imgUrl}/>
            </box>

            <form onSubmit={this.handleSubmit}>
                Name:
                 <input
                    className="input"
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                    placeholder="Name"
                />
                Email:
                <input
                    className="input"
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    placeholder="Email"
                />
                Image URL: 
                 <input
                    className="input"
                    type="text"
                    name="imgUrl"
                    value={this.state.imgUrl}
                    onChange={this.handleImgUrlChange}
                    placeholder="Image URL"
                />
            </form>
            </div>
        )}
}

const mapState = ({ students }) => ({ students });
const mapDispatch = { };

export default connect(mapState, mapDispatch)(StudentDetail);
