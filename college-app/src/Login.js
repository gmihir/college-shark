import React from 'react';
import './Loginsignup.css';
import GoogleButton from 'react-google-button';

function Login() {
    return (
        <div className="Login">
            <div className="background">
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

                    <div className="google-login-divide">
                        <hr className="lineone" /> 
                        <h2>Or</h2>
                        <hr className="linetwo"/> 
                    </div>
                    <GoogleButton className="google-button" onClick={() => { console.log('Google button clicked') }} />
                </div>
            </div>
        </div>
    );
}

export default Login;