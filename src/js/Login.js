import React from 'react';
import '../css/Loginsignup.css';
import GoogleButton from 'react-google-button';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            password: ''
        };
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
    }

    googleLogin() {
        console.log('Google button Clicked!');
    };
     
    handleChangeUser(event) {
        this.setState({ user: event.target.value});
    };

    handleChangePass(event) {
        this.setState({ password: event.target.value});
    };
     
    login = () => {
        if (this.state.user === '' || this.state.password === '') {
            console.log('empty');
        }
        else {
            console.log(this.state.user);
            console.log(this.state.password);
        }
        console.log('button works');
    };
    
    render() {
        return (
            <div className = "Login" >
                <div className="credentials">
                    <div className="email-password">
                        <input className="email" type="text" placeholder="Email" 
                        value={this.state.user} onChange={this.handleChangeUser} />
                        <input className="password" type="text" placeholder="Password" 
                        value={this.state.password} onChange={this.handleChangePass} />
                    </div>
    
                    <div className="login-button-div">
                        <button className="login-button" onClick={this.login}>Log in</button>
                    </div>
    
                    <div className="google-login-divide">
                        <hr className="lineone" />
                        <h2>Or</h2>
                        <hr className="linetwo" />
                    </div>
                    <GoogleButton className="google-button" onClick={this.googleLogin} />
                </div>
            </div>
        );
    }
}

export default Login;