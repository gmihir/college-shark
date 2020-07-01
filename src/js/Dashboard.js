import React from 'react';
import '../css/Dashboard.css';

import Table from './Table';
import Nav from './Nav';

function Dashboard() {
    return (
        <div className="dashboard">
            <Nav />

            <span>
                <h1>My Dashboard</h1>
                <Table />
            </span>  
        </div>
    );
}

export default Dashboard;