import '../css/Dashboard.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Spinner } from 'react-bootstrap';
import NavBar from '../components/content/Navbar';

import { UsersToolbar, UsersTable } from '../components/dashboardComponents';
import DashboardTable from '../components/dashboardComponents/UsersTable/DashboardTable';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: false,
      resultsFromSearch: [],
      users: [],
      rerender: false,
      selectedColleges: [],
      Loading: true,
      userInfo: []
    };
    this.setSearch = this.setSearch.bind(this);
    this.removeColleges = this.removeColleges.bind(this);
    this.selectedCollegeSet = this.selectedCollegeSet.bind(this);
    this.searchBarInUse = this.searchBarInUse.bind(this);
  }

  removeColleges = async (selected) => {
    let CollegeNames = []
    CollegeNames.push(selected);
    fetch("/removedashboardcollege", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        CollegeName: selected,
        UserEmail: sessionStorage.getItem("userData")
      })
    }).then(response => {
      return response.json();
    }).then(data => {
      this.setState({
        rerender: false,
        Loading: false
      });
    })
  }

  componentDidMount() {
    if (!sessionStorage.getItem('userData')) {
      this.setState({ Loading: false });
    }
  }

  selectedCollegeSet = (colleges) => {
    if (this.state.selectedColleges !== colleges) {
      this.setState({ selectedColleges: colleges });
    }
  }

  setSearch = (results) => {
    if (results !== this.state.resultsFromSearch) {
      this.setState({
        resultsFromSearch: results
      })
    }
  }

  searchBarInUse = (inUse) => {
    if (inUse !== this.state.searchBar) {
      if (inUse) {
        this.setState({ searchBar: inUse, rerender: true });
      } else {
        this.setState({ searchBar: inUse, rerender: false });
      }
    }
  }

  pullColleges() {
    Promise.all([
      fetch("/dashboard", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          UserEmail: sessionStorage.getItem("userData")
        })
      }),
      fetch("/userdashboardinfo", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Email: sessionStorage.getItem("userData")
        })
      })
    ]).then(([res1, res2]) => 
    Promise.all([res1.json(), res2.json()])
    ).then(([data1, data2]) => {
      let collegeList = [];
      data1.map(college => {
        var collegeName = JSON.parse(college);
        collegeList.push(collegeName);
      })
      sessionStorage.setItem("collegeNames", JSON.stringify(collegeList));
      if (this.state.rerender) {
      } else {
        this.setState({
          users: collegeList,
          rerender: true,
          Loading: false,
          userInfo: data2
        });
      }
    })
  }

  renderDashboard = () => {
    if (this.state.searchBar === false) {
      if (this.state.rerender) {

      } else {
        this.pullColleges();
      }

      if (this.state.Loading) {
        return (
          <div className={useStyles.root}>
            <div className="spinner-center">
              <div className="spinner-div">
                <Spinner animation="border" variant="secondary" role="status" className="load-spinner">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            </div>
          </div>
        )
      } else if (this.state.users.length === 0) {
        return (
          <div style={{ width: '100%', textAlign: 'center', marginTop: 'calc(15%)', color: 'rgb(0, 0, 0, 0.534)', fontFamily: 'Roboto, sans-serif' }}>
            <h3>You haven't selected any colleges, click Explore to start adding some!</h3>
          </div>
        )
      }
      return (
        <div className={useStyles.theme}>
          <DashboardTable headers={this.state.userInfo['information']['tabs']} state={this.state.userInfo['information']['state']} userInfo={this.state.userInfo} users={this.state.users} removeColleges={this.removeColleges} setColleges={this.selectedCollegeSet} key={sessionStorage.getItem("collegeNames")} />
        </div>
      )
    } else {

    }
  }

  render() {

    if (!sessionStorage.getItem('userData')) {
      return (
        <div>
          <NavBar searchBarInUse={this.searchBarInUse} setSearch={this.setSearch} searchBar={this.state.searchBar} active="1" />
          <div className="empty-div">
            <div className="redirect-div">
              <h3 className="explore-redirect">To use this feature, you have to be signed in! Click 'Sign up' If you're not a user</h3>
              <button className="signup-redirect" onClick={() => this.props.history.push('/signup')}>Sign up</button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <NavBar searchBarInUse={this.searchBarInUse} setSearch={this.setSearch} searchBar={this.state.searchBar} active="1" />
          <div>
            {
              this.renderDashboard()
            }
          </div>

        </div>
      )
    }
  }
}



export default Dashboard;