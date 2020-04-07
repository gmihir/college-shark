import React from 'react';
import './Loginsignup.css';
import './App.css';
import GoogleButton from 'react-google-button';

function Login() {
    return (
        <div className="Login">
            <div className="background">
                <div className="credentials">
                    <h1>This is a slogan</h1>
                    
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

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
);

export default Login;