import React from 'react';
import '../../css/Heart.css';

class Heart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            currentCollege: this.props.collegeName,
            key: this.props.key
        }
        this.handleClick = this.handleClick.bind(this);
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

    render() {
        if (this.state.status === true) {
            return (
                <div className="redheart" onClick={this.handleClick} />
            )
        } else {
            return (
                <div className="heart" onClick={this.handleClick} />
            )
        }
    }
}

export default Heart