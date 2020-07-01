import React from 'react';
import '../css/Profile.css';
import Nav from './Nav';
import Image from './stephen_the_goat.jpg';

function Profile() {
    return (
        <div className="background1">
            <Nav />
            <div>
                <div className="image-box fill">
                    <img src={Image} height="200"/>
                </div>
                <div className="basic-info-box">
                    <div className="basic-text">
                        <p>Better than Harden.</p>
                        <p>Better than Giannis.</p>
                        <p>Better than Westbrick.</p>
                        <p>Better than Durant.</p>
                        <p>Better than Donkey.</p>
                        <p>Better than Brady.</p>
                        <p>Better than Keenan.</p>
                        <p>Better than LeChoke.</p>
                        <p>Better than J O R D A N.</p>
                    </div>
                </div>
                <div className="advanced-info-box">
                    <div className="advanced-text">
                    <p>After the first month of the NBA season and a 13-0 start for the Golden State Warriors, it's time we all admit Stephen Curry is the best player in the NBA.

LeBron James fans—myself included—should step aside for the Chef ("Cheph" patent still pending). It's not a bad thing to relinquish James' top spot. It's merely respect for the hottest player in the league.</p>

<p>(To clarify: the greatest player in the league is James, but right now, Curry is the best.)</p>

<p>If something happens once, it's a fluke. If it happens twice, it's a trend and if it happens three times, then it's a pattern. And that's a microcosm of Curry's ascension to becoming the top player in the league. Curry started off as a hot shooter, turned into one of the game's best shooters and eventually turned into one of the best shooters ever, all while developing a gorgeous handle with an ability to pass and finish at the rim. This all happened in three years—oh, and add in an MVP and championship.</p>
                    <p>I won't stand for any Steph slander.  He is the GOAT, if you can't see that then you are certifiably blind and there truly is no saving you.  You must be stuck up USC or some stupid kid from Berkeley or maybe even Toucan Sam.  Whatever your handicap or disability is, it's time to recognize his AIRnesses greatness. </p>
                    </div>
                </div>
                <div className="buttons">
                    <div className="apply-buttons" > 
                        <span>
                            <h1 className="button-text">SRHS PORTAL FOR IDIOTS</h1>
                        </span>
                    </div> 
                    <div className="apply-buttons" > 
                        <span>
                            <h1 className="button-text">UCSD >>> USC</h1>
                        </span>
                    </div> 
                    <div className="apply-buttons" > 
                        <span>
                            <h1 className="button-text">RACCOONS</h1>
                        </span>
                    </div> 
                    <div className="apply-buttons" > 
                        <span>
                            <h1 className="button-text">CURRY THE GOAT GOT EM</h1>
                        </span>
                    </div> 
                </div> 
            </ div>
            <span>
                <h1 className="name">University of Red Pandas</h1>
            </span>
        </div>
    );
}

export default Profile;