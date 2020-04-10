import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Features from './Features';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/feature" component={Features} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div className="background">
    <div className="App-header">
      <div className="App-logo-background">
        <Link style={{ textDecoration: 'none'}} to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
      </div>
      
      <div className="border-features">
        <Link style={{ textDecoration: 'none' }} to="/feature">
          <h2 className="features">Features</h2>
        </Link>
      </div>

      <div className="border-dashboard">
        <Link style={{ textDecoration: 'none' }} to="/dashboard">
          <h2 className="dashboard">Dashboard</h2>
        </Link>
      </div>

      <div className="border-login">
      <Link style={{ textDecoration: 'none' }} to="/login">
        <h2 className="login">Login </h2>
      </Link>
      </div>

      <div className="border-signup">
        <Link style={{ textDecoration: 'none' }} to="/signup">
          <h2 className="signup">Sign up</h2>
        </Link>
      </div>
    </div>

    <div className="slogan">
      All your needs, organized. One Place.
    </div>

    <div className="searchbar">
      <input className="bar" type="text" placeholder="Find your dream school" />

      <div className="advanced">
        Advanced
      </div>
    </div>


  </div>
);

export default App;
