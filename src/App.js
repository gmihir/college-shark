import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Explore from './pages/Explore';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Individual from './pages/Individual';
import MapView from './pages/MapView';
import Essays from './pages/Essays';
 

const RequireAuth = (Component) => {
  return class Application extends Component {
    componentWillMount() {
      if (sessionStorage.getItem("userData")) {

      } else {
        this.props.history.replace({ pathname: '/login' });
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
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
            crossOrigin="anonymous"
            />
          <Switch>
            <Route exact path="/explore" render={(props) => (
              <Explore {...props} key={"Explore"} />
            )} />
            <Route exact path="/explore/results" render ={(props) => (
                <Explore {...props} key={props.location.key} /> 
              )} />
            <Route exact path="/mycolleges" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/page/:collegeName" render={(props) => (
              <Individual key={props.match.params.collegeName} {...props} />)
            } />
            <Route exact path="/essays" component={Essays} />
            <Route exact path="/map" component={MapView} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;