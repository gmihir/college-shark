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
          Colleges: [],
          CollegeMap: [],
          isVisible: false,
          activeMarker: {},
          selectedPlace: {}
      }

        this.searchBarInUse = this.searchBarInUse.bind(this);
        this.setSearch = this.setSearch.bind(this);
        this.markerClicked = this.markerClicked.bind(this);
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

    markerClicked(props, marker) {
      console.log("here");
      console.log(props)
      console.log(marker);
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        isVisible: true
      })
    }

    componentDidMount() {
      console.log("here: fetch2")
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
      console.log("here")
        fetch("/map", {
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
            this.setState({CollegeMap: data});
        })
      })
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
                    {this.state.CollegeMap.map(college => {
                      const lat = JSON.parse(college).latitude;
                      const lng = JSON.parse(college).longitude;
                      const title = JSON.parse(college).college_name;
                      return ( <Marker college={college} name={title} title={title} position={{lat: lat, lng: lng}} 
                        onClick={(props, marker, e) => this.markerClicked(props, marker, e)}
                      /> )
                    })}
                </Map>
            </section>

            {!this.state.isVisible ? 
            <section className="college-display">
              <div className="map-search">
                    <SearchBar searchBarInUse={this.searchBarInUse} setSearch={this.setSearch} list={this.state.Colleges} 
                        barwidth={'95%'} nodelayout={"map-results"}
                    />
                </div>
            </section> : 
              <section className="college-display">
                <div className="map-search">
                    <SearchBar searchBarInUse={this.searchBarInUse} setSearch={this.setSearch} list={this.state.Colleges} 
                        barwidth={'95%'} nodelayout={"map-results"}
                    />
                </div>

                <section className="img-section">
                    <img src={JSON.parse(this.state.selectedPlace.college).college_campus} alt="College Campus" width="100%" height="100%" />
                </section>
                
                <div className="college-information">
                    <h1 className="college-name">{this.state.selectedPlace.name}</h1>
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
                            <h2>{JSON.parse(this.state.selectedPlace.college).national_ranking}</h2>
                            <h2>{JSON.parse(this.state.selectedPlace.college).tuition_normal}</h2>
                            <h2>{JSON.parse(this.state.selectedPlace.college).state}</h2>
                            <h2>{JSON.parse(this.state.selectedPlace.college).locale}</h2>
                            <h2>{JSON.parse(this.state.selectedPlace.college).population}</h2>
                            <h2>{JSON.parse(this.state.selectedPlace.college).regular_decision}</h2>   
                        </div>
                    </div>

                    <hr></hr>

                </div>
            </section>}
        </div>
      );
    }
  }
 
export default GoogleApiWrapper({
    apiKey: REACT_APP_API_KEY
})(MapView);