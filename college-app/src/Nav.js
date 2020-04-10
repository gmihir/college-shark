import React from 'react';
import logo from './logo.svg';
import './App.css';
import './Nav.css';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';

function Nav() {
    return (
        <div className="App-header">
            <div className="App-logo-background">
                <Link style={{ textDecoration: 'none' }} to="/">
                    <img src={logo} className="App-logo" alt="logo" />
                </Link>
            </div>

            <div className="border-features">
                <Link style={{ textDecoration: 'none' }} to="/feature">
                    <h2 className="features">Features</h2>
                </Link>
            </div>

            <div className="border-dashboard">
                <Link style={{ textDecoration: 'none' }} to="/dashboard">
                    <h2 className="dashboard">Dashboard</h2>
                </Link>
            </div>

            <div className="border-login">
                <Link style={{ textDecoration: 'none' }} to="/login">
                    <h2 className="login">Login </h2>
                </Link>
            </div>

            <div className="border-signup">
                <Link style={{ textDecoration: 'none' }} to="/signup">
                    <h2 className="signup">Sign up</h2>
                </Link>
            </div>
        </div>
    );
}

export default Nav;