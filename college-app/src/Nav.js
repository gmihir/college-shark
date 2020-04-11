import React from 'react';
import logo from './logo.svg';
import './Nav.css';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav>
            <ul className="navbar">
                <Link style={{ textDecoration: 'none' }} to="/">
                    <li>
                        <img src={logo} className="App-logo" alt="logo" />
                    </li>
                </Link>

                <Link style={{ textDecoration: 'none' }} to="/feature">
                    <li className="features-link">Features</li>
                </Link>

                <Link style={{ textDecoration: 'none' }} to="/dashboard">
                    <li className="dashboard-link">Dashboard</li>
                </Link>  

                <Link style={{ textDecoration: 'none' }} to="/login">
                    <li className="login-link">Login</li>
                </Link>  

                <Link style={{ textDecoration: 'none' }} to="/signup">
                    <li className="signup-link">Sign up</li>
                </Link>        
            </ul>
        </nav>
    );
}

export default Nav;