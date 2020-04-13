import React from 'react';
import './Home.css';

import Nav from './Nav';

function Home() {
    return (
        <div className="Background-home-page">
            <Nav />
            <div className="searchbar">
                <input className="bar" type="text" placeholder="Find your dream school" />

                <div className="advanced-box">
                    <h2 className="advanced">Advanced</h2>
                </div>
            </div>

            <div className="slogan-image">

                <div className="slogan">
                    <h1 className="slogan-text">All your needs, organized. One Place.</h1>
                </div>
                <div className="description-website">
                    <p className="description">Here is a filling paragraph dasd asdas asdas dasd asdas </p>
                </div>

            </div>
        </div>
    );
}

export default Home;