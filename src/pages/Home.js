import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Form, Modal, Carousel} from 'react-bootstrap';
import NavBar from '../components/content/Navbar';
import SearchBar from '../components/content/SearchBar';
import '../css/Home.css';
import { faGlobeAmericas, faLayerGroup, faScroll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Stanford = require('./wp2017235.jpg');
const Rice = require('./Rice.jpg');
const Berkeley = require('./Royce.png');

function Home() {

    const [email, setEmail] = useState({Email: ''});
    const [name, setName] = useState({Name: ''});
    const [message, setMessage] = useState({Message: ''});
    const [show, setShow] = useState({Show: ''});
    const [search, setSearching] = useState({Search: false});
    const [results, setResults] = useState({Results: []});
    const [colleges, getColleges] = useState({Colleges: []});

    useEffect(() => {
        fetch("/searchbar", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
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
        getColleges({Colleges: collegeList});
        });
    }, []);

    function handleClick(e) {
        fetch("/email", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: email.Email,
                Name: name.Name,
                Message: message.Message
            })
        }).then(response => {
            console.log("success");
            return response.json();
        }).then(data => {
            setMessage({Message: ''});
            setEmail({Email: ''});
            setName({Name: ''});
            setShow({Show: true});
        });
    }

    function searchBarInUse(inUse) {
        console.log(inUse);
        console.log(search.Search);
        if (inUse !== search.Search) {
            setSearching({ Search: inUse});
        }
    }

    function setSearch(results) {
        if (results !== results.Results) {
          setResults({Results: results});
        }
      }

    // if(localStorage.getItem("userData")){
    //     return(<Redirect to='/mycolleges' />)
    // }

    function handleDisplay() {
        return (
          <Modal show={show.Show} onHide={() => setShow({Show: false})}>
            <Modal.Header closeButton>
              <Modal.Title>Email Sent!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Thank you for contacting us! We will be in touch with you soon!</Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
        )
      }
    
    return (
        <div className="Background-home-page">
            <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"></link>
            <div className="navbar-home">
                    <NavBar searchBarInUse={searchBarInUse} setSearch={setSearch} searchBar={search.Search} displaySearch={false} />
                </div>

            <div className="image-background">
                <Container style={{paddingBottom: 'calc(5vh)'}}>
                    <Row className="justify-content-md-center">
                        <Col md="auto" style={{fontSize: "calc(5.5rem"}}>100 APPS. ONE PLACE.</Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        <Col md="auto" style={{fontSize: "calc(2rem", marginTop: 'calc(0.7rem)'}}>College Apps, Redefined.</Col>
                    </Row>

                    <Row className="justify-content-md-center">
                        {/* <Link to="/signup">
                            <Button variant="primary" size="lg">
                                Sign up
                            </Button>{' '}
                        </Link> */}
                    </Row>
                </Container>
                
                <div className="searchbar-home">
                    <span style={{marginLeft: 'calc(50%)'}} />
                    <div className="searchbar-container">
                        <SearchBar searchBarInUse={searchBarInUse} setSearch={setSearch} list={colleges.Colleges} />
                    </div>
                </div>

            </div>

            <Carousel pause={true} interval={3500}>
                <Carousel.Item>
                    <img
                    className="w-100"
                    src={Stanford}
                    alt="First slide"
                    height="850"
                    />
                    <Carousel.Caption>
                        <h3>Stanford University</h3>
                        <p>The Main Quad</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={Rice}
                    alt="Secord slide"
                    height="850"
                    />

                    <Carousel.Caption>
                        <h3>Rice University</h3>
                        <p>Lovett Hall</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={Berkeley}
                    alt="Third slide"
                    height="850"
                    />

                    <Carousel.Caption>
                        <h3>University of California, Berkeley</h3>
                        <p>Sather Gate</p>
                    </Carousel.Caption>
            </Carousel.Item>
            </Carousel>

            <div className="features-container">
                <div className="features">
                    <h1 className="header-h1">FEATURES</h1>
                    
                    {/* <div className="header-div">
                        <h1 className="header-feature">SEARCH</h1>
                        <h1 className="header-feature">EXPLORE</h1>
                        <h1 className="header-feature">ORGANIZE</h1>
                    </div> */}

                    <Container fluid style={{marginTop: 'calc(-7vh)', marginBottom: 'calc(-5vh)'}}>
                        <Row>
                            <Col xs={6} md={4}>
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <h1 className="header-feature">ESSAYS</h1>
                                </div>
                            </Col>
                            <Col xs={6} md={4}>
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <h1 className="header-feature">EXPLORE</h1>
                                </div>
                            </Col>
                            <Col xs={6} md={4}> 
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <h1 className="header-feature">ORGANIZE</h1>
                                </div>
                            </Col>
                        </Row>
                    </Container>

                    <Container fluid>
                        <Row>
                            <Col xs={6} md={4}>
                                <div className='description-hover'>
                                    <div className="icon-border">
                                        <div><FontAwesomeIcon icon={faScroll} /></div>
                                    </div>
                                    <p>Organize all of your essay requirements in one place. Optimize your workflow and work smarter, not harder.</p>
                                </div>
                            </Col>
                            <Col xs={6} md={4}>
                                <div className='description-hover'>
                                    <div className="icon-border">
                                        <div><FontAwesomeIcon icon={faGlobeAmericas} /></div>
                                    </div>
                                    <p> Don't know where to start? Explore colleges with filters customizable by you. Explore and
                                    find hundreds of colleges that fit your needs. </p>
                                </div>
                            </Col>
                            <Col xs={6} md={4}> 
                                <div className='description-hover'>
                                    <div className="icon-border">
                                        <div><FontAwesomeIcon icon={faLayerGroup} /></div>
                                    </div>
                                    <p> Keep track of all your colleges on a personalized dashboard with the information that matters most.</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>

            <div className="contact-div">
                <section className="contact">
                <h1>Questions? Contact Us.</h1>
                    <Form>
                        <Form.Row>
                            <Col style={{marginTop: 'calc(4rem)'}}>
                                <Form.Group controlId="exampleForm.ControlInput1" style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Form.Control type="text" placeholder="John Doe" style={{width: 'calc(55%)'}} onChange={(e) => setName({Name: e.target.value})} 
                                        value={name.Name}
                                    />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput1" style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Form.Control type="email" placeholder="name@example.com" style={{width: 'calc(55%)'}} 
                                    onChange={(e) => setEmail({Email: e.target.value})} value={email.Email}/>
                                </Form.Group>
                            </Col>
                            <Col style={{marginTop: 'calc(4rem)'}}>
                                <Form.Group controlId="exampleForm.ControlTextarea1" style={{display: 'flex', justifyContent: 'left'}}>
                                    <Form.Control as="textarea" rows="3" style={{height: 'calc(10rem)', width: 'calc(55%)'}} placeholder="Enter message here..."
                                        onChange={(e) => setMessage({Message: e.target.value})} value={message.Message}
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Row>
                            <Col md={{ span: 4, offset: 4 }}>
                                <Button variant="primary" size="lg" onClick={handleClick}>
                                    Send Message
                                </Button>{' '}
                            </Col>
                        </Row>
                    </Form>
                </section>
            </div>

            <span></span>

            {show.Show ? handleDisplay() : null}
        </div>
    );
}

export default Home;