import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Explore from './pages/Explore';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Features from './pages/Features';
import Individual from './pages/Individual';
import Essays from './pages/Essays';

const RequireAuth = (Component) => {
  return class Application extends Component {
    componentWillMount() {
      if (sessionStorage.getItem("userData")) {

      } else {
        this.props.history.replace({ pathname: '/loginhome/login' });
      }
    }

    render() {
      return <Component Component />
    }

  }
}

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/loginhome/explore" component={RequireAuth(Explore)} />
            <Route path="/loginhome/dashboard" component={RequireAuth(Dashboard)} />
            <Route path="/loginhome/login" component={Login} />
            <Route path="/loginhome/signup" component={Signup} />
            <Route exact path="/loginhome/page/:collegeName" render={(props) => (
              <Individual key={props.match.params.collegeName} {...props} />)
            } />
            <Route path="/loginhome/essays" component={RequireAuth(Essays)} />
            <Route path="/profile" component={RequireAuth(Profile)} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;