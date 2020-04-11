import React from 'react';
import './Home.css';

import Nav from './Nav';

function Home() {
    return (
        <div className="Background-home-page">
            <Nav />
            <div className="slogan">
                <h1 className="slogan-text">All your needs, organized. One Place.</h1>
            </div>

            <div className="searchbar">
                <input className="bar" type="text" placeholder="Find your dream school" />

                <div className="advanced">
                    Advanced
                </div>
            </div>
        </div>
    );
}

export default Home;