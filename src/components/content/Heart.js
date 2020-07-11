import React from 'react';
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
            key: this.props.key
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleClick = async (e) => {
        if (this.state.status === true) {
            fetch("/removecollege", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    CollegeName: this.state.currentCollege
                })
            }).then(response => {
                return response.json();
            }).then(data => {
                let collegeList = [];
                data.map(college => {
                    var collegeName = JSON.parse(college);
                    collegeList.push(collegeName);
                })
                sessionStorage.removeItem("collegeNames");
                sessionStorage.setItem("collegeNames", JSON.stringify(collegeList));
            })
            this.setState({ status: false });
        } else {
            fetch("/addcollege", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    CollegeName: this.state.currentCollege
                })
            }).then(response => {
                return response.json();
            }).then(data => {
                let collegeList = [];
                data.map(college => {
                    var collegeName = JSON.parse(college);
                    collegeList.push(collegeName);
                })
                sessionStorage.removeItem("collegeNames");
                sessionStorage.setItem("collegeNames", JSON.stringify(collegeList));
            })
            this.setState({ status: true });
        }
    }
    componentWillMount() {
        if (sessionStorage.getItem("collegeNames") !== null) {
            JSON.parse(sessionStorage.getItem("collegeNames")).map(college => {
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

export default Heart