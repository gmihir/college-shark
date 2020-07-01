import React from 'react';
import './css/Home.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Features from './js/Features';
import Login from './js/Login';
import Signup from './js/Signup';
import Dashboard from './js/Dashboard';
import Profile from './js/Profile';
import Home from './js/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/feature" component={Features} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
