import React from 'react';
import './Dashboard.css';

import Nav from './Nav';

function Dashboard() {
    return (
        <div className="body-dash">
            <div className="background-dash">
                <Nav />
                <div className="slogan">
                    <h1>This is a slogan that Varun wants!</h1>
                </div>
                <div className="credentials">
                    <div className="email-password">
                        <input className="email" type="text" placeholder="Email" />
                        <input className="password" type="text" placeholder="Password" />
                    </div>

                    <div className="login-button-div">
                        <button className="login-button">Log in</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;