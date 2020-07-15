import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Explore from './pages/Explore';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
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

  constructor(props) {
    super(props);

    this.makeid = this.makeid.bind(this);
  }

  makeid() {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < 6; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

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
            <Route exact path="/loginhome/explore" render={(props) => (
              <Explore {...props} key={"Explore"} />
            )} />
            <Route exact path="/loginhome/explore/results" render ={(props) => (
                <Explore {...props} key={props.location.key} /> 
              )} />
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