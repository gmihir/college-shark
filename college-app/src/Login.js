import React from 'react';
import './Loginsignup.css';
import './App.css';
import GoogleButton from 'react-google-button';

function Login() {
    return (
        <div className="Login">
            <div className="background">
                <div className="credentials">
                    <div className="email-password">
                        <input className="email" type="text" placeholder="Email" />
                        <input className="password" type="text" placeholder="Password" />
                    </div>
                    
                    <div className="submit-button">
                        <button className="login-button">Log in</button>
                    </div>

                    <div className="google-login-divide">
                        <hr className="lineone" /> 
                        <h2>Or</h2>
                        <hr className="linetwo"/> 
                    </div>
                    <GoogleButton onClick={() => { console.log('Google button clicked') }} />
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