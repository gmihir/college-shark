import React from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoMdContact } from "react-icons/io";
import {
    faHome,
    faQuestion
} from "@fortawesome/free-solid-svg-icons";
import '../../css/Navigationbar.css';

class Navigationbar extends React.Component {
    render() {
        return (
            <div className="navigation-div">
                <div className="sidebar-header">
                    <h3><IoMdContact className="profile"/>Welcome Bossman</h3>
                </div>
                <Nav variant="tabs" className="flex-column" defaultActiveKey={this.props.active}>
                    <Nav.Item className="dashboard">
                        <Nav.Link eventKey="1" href="/loginhome/dashboard">
                        <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>  Dashboard</Nav.Link>
                    </Nav.Item>

                    <Nav.Item className="explore">
                        <Nav.Link eventKey="2" href="/loginhome/explore">
                        <FontAwesomeIcon icon={faQuestion}></FontAwesomeIcon>  Explore</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        );
    }
}

export default Navigationbar