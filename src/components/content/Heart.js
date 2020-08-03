import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import AddCircle from '@material-ui/icons/AddCircle';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import '../../css/Heart.css';

class Heart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            hoverStatus: false,
            currentCollege: this.props.collegeName,
            key: this.props.key,
            Show: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.notSignedIn = this.notSignedIn.bind(this);
    }

    notSignedIn() {
        return (
            <Modal show={this.state.Show} onHide={() => this.setState({Show: false})}>
                <Modal.Header closeButton>
                <Modal.Title>Not Signed In!</Modal.Title>
                </Modal.Header>
                <Modal.Body>To use this feature, you have to be signed in! Click 'Sign up' If you're not a user</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => this.props.history.push('/signup')}
                    style={{fontFamily: 'Roboto, sans-serif', fontWeight: '500'}}>
                    Sign up
                </Button>
                <Button variant="primary" onClick={() => this.props.history.push('/login')}
                style={{fontFamily: 'Roboto, sans-serif', fontWeight: '500'}}>
                    Login
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    handleClick = async (e) => {
        console.log(localStorage.getItem("userData"))
        if(localStorage.getItem("userData") === null) {
            this.setState({Show: true});
            return;
        }

        if (this.state.status === true) {
            fetch("/removecollege", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    CollegeName: this.state.currentCollege,
                    UserEmail: localStorage.getItem("userData")
                })
            }).then(response => {
                return response.json();
            }).then(data => {
                let collegeList = [];
                data.map(college => {
                    var collegeName = JSON.parse(college);
                    collegeList.push(collegeName);
                })
                localStorage.removeItem("collegeNames");
                localStorage.setItem("collegeNames", JSON.stringify(collegeList));
            })
            this.setState({ status: false });
        } else {
            fetch("/addcollege", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    CollegeName: this.state.currentCollege,
                    UserEmail: localStorage.getItem("userData")
                })
            }).then(response => {
                return response.json();
            }).then(data => {
                let collegeList = [];
                data.map(college => {
                    var collegeName = JSON.parse(college);
                    collegeList.push(collegeName);
                })
                localStorage.removeItem("collegeNames");
                localStorage.setItem("collegeNames", JSON.stringify(collegeList));
            })
            this.setState({ status: true });
        }
    }
    componentWillMount() {
        if (localStorage.getItem("collegeNames") !== null) {
            JSON.parse(localStorage.getItem("collegeNames")).map(college => {
                if (college.college_name === this.props.collegeName) {
                    if (this.state.status !== true) {
                        this.setState({ status: true })
                    }
                } else {
                    if (this.state.status !== false) {
                        this.setState({ status: false })
                    }
                }
            });
        }
    }

    handleMouseEnter() {
        this.setState({hoverStatus: true})
    }

    handleMouseLeave() {
        this.setState({hoverStatus: false})
    }

    render() {
        if(this.state.Show) {
            return (
                this.notSignedIn()
            )
        }

        if(this.state.status){
            if(this.state.hoverStatus){
                return (
                    <RemoveCircle className="removefavicon" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={this.handleClick}/>
                )
            }else{
                return (
                    <RemoveCircleOutline className="removeoutlinefavicon" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={this.handleClick} />
                )
            }
        }else{
            if(this.state.hoverStatus){
                return (
                    <AddCircle className="addfavicon" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={this.handleClick} />
                )
            }else{
                return (
                    <AddCircleOutline className="addoutlinefavicon" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={this.handleClick} />
                )
            }
        }
    }
}

export default withRouter(Heart);