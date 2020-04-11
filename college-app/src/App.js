import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Features from './Features';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Nav from './Nav';

function App() {
  return (
    <Router>
      <div className="App">
      <Nav />
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

export default App;
