import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import React, { Component } from 'react';
import NavBar from '../components/content/Navbar';
import SearchBar from '../components/content/SearchBar';
import Heart from '../components/content/Heart';
import '../css/MapView.css';
import Image from './UCSDCampus.jpg';

const { REACT_APP_API_KEY } = process.env;

const mapStyles = {
    float: 'right',
    position: 'static',
    width: '78%',
    height: 'auto',
    minHeight: '92vh',
    overflow: 'hidden'
  };

export class MapView extends Component {
    constructor(props) {
        super(props);

        this.state = {
          resultsFromSearch: [],
          searchBar: false,
          Colleges: []
      }

        this.searchBarInUse = this.searchBarInUse.bind(this);
        this.setSearch = this.setSearch.bind(this);
    }

    searchBarInUse = (inUse) => {
      if (inUse !== this.state.searchBar) {
          this.setState({ searchBar: inUse });
      }
    }

    setSearch = (results) => {
      if (results !== this.state.resultsFromSearch) {
          this.setState({
              resultsFromSearch: results
          })
      }
    }

    componentDidMount() {
        fetch("/searchbar", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              IsDescending: true
            })
          }).then(response => {
            return response.json()
          }).then(data => {
            let collegeList = [];
            data.map(college => {
              let collegeNames = [];
              collegeNames.push(JSON.parse(college).college_name);
              collegeNames.push(JSON.parse(college).alias);
              collegeNames.push(JSON.parse(college).abbreviation);
              collegeList.push([collegeNames, JSON.parse(college).college_logo]);
            })
          this.setState({Colleges: collegeList});
          });
    }
    
    render() {
      return (
        <div className="mapview-container">
            <NavBar searchBarInUse={this.searchBarInUse} setSearch={this.setSearch} searchBar={this.state.searchBar} active="4" 
            location={this.props.location} />
            <section className="mapview">
                <Map
                    google={this.props.google}
                    zoom={5}
                    style={mapStyles}
                    initialCenter={{
                        lat: 40.854885,
                        lng: -98.081807
                    }}
                >
                    <Marker name={'USD'} title={"UCSD"} position={{lat: 41, lng: -72}}/>
                    <Marker title={"UCSD"} position={{lat: 31, lng: -92}}/>
                    <Marker
                        name={'Your position'}                      
                        position={{lat: 37.762391, lng: -122.439192}}
                    />
                </Map>
            </section>

            <section className="college-display">
                <div className="map-search">
                    <SearchBar searchBarInUse={this.searchBarInUse} setSearch={this.setSearch} list={this.state.Colleges} 
                        barwidth={'95%'} nodelayout={"map-results"}
                    />
                </div>

                <section className="img-section">
                    <img src={Image} alt="College Campus" width="100%" height="100%" />
                </section>
                
                <div className="college-information">
                    <h1 className="college-name">University of California, Los Angeles</h1>
                    <hr></hr>

                    <div>
                        <button className="individual-redirect">FIND OUT MORE NEXT TIME ON MASTER CHEF</button>
                    </div>
                    
                    <hr></hr>

                    <div className="college-add-icon">
                        <Heart />
                    </div>
                    
                    <div className="college-info-container">
                        <div className="college-info-header">
                            <h2>Ranking:</h2>
                            <h2>Tuition:</h2>
                            <h2>State:</h2>
                            <h2>Town type:</h2>
                            <h2>Student size:</h2>
                            <h2>Regular Decision:</h2>
                        </div>

                        <div className="college-info-values">
                            <h2>1</h2>
                            <h2>$10,000</h2>
                            <h2>CA</h2>
                            <h2>College town</h2>
                            <h2>20,000 </h2>
                            <h2>11/30/2020</h2>   
                        </div>
                    </div>

                    <hr></hr>

                </div>
            </section>
        </div>
      );
    }
  }
 
export default GoogleApiWrapper({
    apiKey: REACT_APP_API_KEY
})(MapView);