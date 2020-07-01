import React from 'react';
import '../css/Profile.css';
import Image from './download.png'
import { Button } from 'react-bootstrap';
import NavBar from '../components/content/Navbar';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'Bossman',
            email: ''
        }
    }

    componentDidMount() {
        const email = sessionStorage.getItem('userData');
        this.setState({
            username: email,
            email: email
        })
    }

    render() {
        return (
            <div className='profile'>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"></link>
            <NavBar />
                <div className='image-background'>
                    <div className='white-background'>
                        <div className='shadow' >
                            <img src={Image} style={{ width: '95%' }} />
                        </div>
                        <div className="welcome">
                            <p>
                                Hello, {this.state.username}!
                            </p>
                        </div>
                        <Button variant="primary" size="lg">
                            Change this
                        </Button>
                        <Button variant="primary" size="lg"> 
                            Change that
                        </Button>
                    </div>
                </div>
                <span></span>
            </div>
        );
    }
}

export default Profile
