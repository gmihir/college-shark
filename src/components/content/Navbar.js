import React from "react";
import { Navbar, Nav, NavDropdown, Modal} from "react-bootstrap";
import { Link } from 'react-router-dom';
import '../../App.css';
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser
} from "@fortawesome/free-solid-svg-icons";


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collegelist: [],
      Reset: false,
      Show: false,
      Username: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
  }

  // addColleges(){
  //   fetch('/addressToBackEndList').then(res => res.json()).then(data => {
  //     this.state.collegelist.push(data.college_name);
  //     let college = data[0];
  //     const x = JSON.parse(college);
  //     console.log("college_name");
  //   });
  // }


  componentDidMount() {
    const email = sessionStorage.getItem("userData");
    fetch("/filter", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Array: [],
        Filter: "national_ranking",
        IsDescending: true
      })
    }).then(response => {
      return response.json()
    }).then(data => {
      let collegeList = [];
      data.map(college => {
        let collegeNames = [];
        collegeNames.push(JSON.parse(college).college_name);
        collegeNames.push(JSON.parse(college).alias);
        collegeNames.push(JSON.parse(college).abbreviation);
        collegeList.push([collegeNames, JSON.parse(college).college_logo]);
      })
      this.setState({
        collegelist: collegeList,
        Username: email
      })
    });
  }



  handleClick = () => {
    sessionStorage.clear();
    fetch("/logout", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  handleReset = () => {
    this.setState({ Reset: false });
    fetch("/passwordreset", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      const isSuccess = data["True"];
      if (isSuccess === 2) {
        this.setState({ Reset: true });
      }
    })
  }

  handleDisplay() {
    return (
      <Modal show={this.state.Reset} onHide={() => this.setState({ Reset: false })}>
        <Modal.Header closeButton>
          <Modal.Title>Email Sent!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Follow the instructions sent to your email and once completed, your password will be updated.</Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    )
  }

  render() {
    return (
      <div className="div-container">
        <Navbar
          className="navbar p-3"
          expand="lg"
          bg="dark" variant="dark"
        >
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Navbar.Brand>
              <Link style={{textDecoration: 'none', color: 'white'}} eventKey="1" to="/loginhome/dashboard">
                  Application Hub
                </Link>
            </Navbar.Brand>
            <Nav className="mr-auto" defaultActiveKey={this.props.active}>
              <Nav.Item className="dashboard">
                <Nav.Link eventKey="1" href="/loginhome/dashboard">
                  My Colleges
                  </Nav.Link>
              </Nav.Item>

              <Nav.Item className="explore">
                <Nav.Link eventKey="2" href="/loginhome/explore">
                  Explore
                  </Nav.Link>
              </Nav.Item>

              <Nav.Item className="explore">
                <Nav.Link eventKey="3" href="/loginhome/essays">
                  Essays
                  </Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav className="ml-auto" navbar>
              <Nav.Item>
                <NavDropdown drop="down" alignRight="false" title={<FontAwesomeIcon icon={faUser} style={{ opacity: '60%' }} />}>
                  <NavDropdown.Header>Hi, {this.state.Username}</NavDropdown.Header>
                  <NavDropdown.Item onClick={this.handleReset}>Reset Password</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={this.handleClick} href="/">Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="navbar-search">
          <SearchBar list={this.state.collegelist} searchBarInUse={this.props.searchBarInUse} searchBar={this.props.searchBar} />
        </div>
        {this.state.Reset ? this.handleDisplay() : null}
      </div>
    );
  }
}

export default NavBar;
