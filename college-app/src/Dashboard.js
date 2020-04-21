import React from 'react';
import './css/Dashboard.css';

import Nav from './Nav';

function Dashboard() {
    return (
        <div className="dashboard">
            <Nav />

            <span>
                <h1>My Dashboard</h1>
            </span>  
        </div>
    );
}

export default Dashboard;