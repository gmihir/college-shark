import React from 'react';
import './Home.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Features from './Features';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Home from './Home';

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

export default App;
