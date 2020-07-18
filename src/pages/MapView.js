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
          selectedPlace: {},
          Bounds: {
            lat: 40.854885,
            lng: -98.081807
          },
          Zoom: 5,
          ShowReset: false
      }

        this.searchBarInUse = this.searchBarInUse.bind(this);
        this.setSearch = this.setSearch.bind(this);
        this.markerClicked = this.markerClicked.bind(this);
        this.resetMap = this.resetMap.bind(this);
        this.numFormat = this.numFormat.bind(this);
        this.dateFormat = this.dateFormat.bind(this);
        this.rankFormat = this.rankFormat.bind(this);
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

    rankFormat(num) {
      if(num === null) {
        return num
      } else if(num >= 10000) {
        return "Unranked"
      } else {
        return num;
      }
    }

    numFormat(num) {
      if (num === null) {
          return num;
      } else {
          return num.toLocaleString();
      }
    }

    dateFormat(input) {
      if(input === -1) {
          return("N/A");
      }
      else if(input === 0) {
        return("Rolling");
      }
      var myDate = new Date(input * 1000);
      return ((myDate.getUTCMonth() + 1) + "/" + myDate.getUTCDate() + "/" + myDate.getUTCFullYear());
    }
    
    resetMap() {
      this.setState({
        Bounds: {
          lat: 40.854885,
          lng: -98.081807
        },
        Zoom: 5,
        ShowReset: false  
      })
    }

    markerClicked(props, marker) {
      //Create an object
      let object = {};

      //Retrieve only the data necessary from props
      //Which is college details, name, and title
      object.college = JSON.parse(props.college);
      object.name = props.name;
      object.title = props.title;
      
      //Set the state accordingly
      this.setState({
        selectedPlace: object,
        activeMarker: marker,
        isVisible: true,
        Zoom: 12,
        ShowReset: true
      }, () => {
        //Set the sessionStorage for when user comes back to the page
        const bound = {
          lat: this.state.selectedPlace.college.latitude,
          lng: this.state.selectedPlace.college.longitude
        }
        this.setState({Bounds: bound})
        sessionStorage.setItem('mapview', JSON.stringify(this.state.selectedPlace.college));
        sessionStorage.setItem('mapviewName', JSON.stringify(this.state.selectedPlace.name));
      })
    }

    componentDidMount() {
      if(sessionStorage.getItem('mapview') === null) {
        //Check to see sessionStorage is empty
      } else {
        console.log("here");
        //Get items out of sessionStorage, only need the name and details, no title
        const toArray = JSON.parse(sessionStorage.getItem('mapview'));
        const getName = JSON.parse(sessionStorage.getItem('mapviewName'));
        
        //Create an object to resemble that in this.markerClicked()
        let obj = {};
        obj.college = toArray;
        obj.name = getName;

        this.setState({
          selectedPlace: obj, 
          isVisible: true,
          Zoom: 12,
          Bounds: {
            lat: obj.college.latitude,
            lng: obj.college.longitude
          },
          ShowReset: true
        });
      }

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
              {this.state.ShowReset ? 
              <div className="reset-map" onClick={() => this.resetMap()}>
                <button className="reset-button">Reset Mapview</button>
              </div> : null}
                <Map
                    google={this.props.google}
                    zoom={this.state.Zoom}
                    style={mapStyles}
                    initialCenter={{
                      lat: 40.854885,
                      lng: -98.081807
                    }}
                    center={this.state.Bounds}
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
            /* If a college is selected, then this will render */
              <section className="college-display">
                <div className="map-search">
                    <SearchBar searchBarInUse={this.searchBarInUse} setSearch={this.setSearch} list={this.state.Colleges} 
                        barwidth={'95%'} nodelayout={"map-results"}
                    />
                </div>

                <section className="img-section">
                    <img src={this.state.selectedPlace.college.college_campus} alt="College Campus" width="100%" height="100%" />
                </section>
                
                <div className="college-information">
                    <h1 className="college-name">{this.state.selectedPlace.name}</h1>
                    <h3>Ranking: {this.rankFormat(this.state.selectedPlace.college.national_ranking)}</h3>
                    <hr></hr>

                    <div>
                        <button className="individual-redirect" 
                        onClick={() => this.props.history.push(`/loginhome/page/${this.state.selectedPlace.name}`)}>
                          Click here to learn more
                        </button>
                    </div>
                    
                    <div className="heart-location">
                      <hr></hr>

                      <div className="college-add-icon">
                          <Heart collegeName={this.state.selectedPlace.name} key={this.state.selectedPlace.name} />
                      </div>
                    </div>
                    
                    <div className="college-info-container">
                        <div className="college-info-header">
                            <h2>Tuition:</h2>
                            <h2>State:</h2>
                            <h2>Town type:</h2>
                            <h2>Student size:</h2>
                            <h2>Regular Decision:</h2>
                        </div>

                        <div className="college-info-values">
                            <h2>${this.numFormat(this.state.selectedPlace.college.tuition_normal)}</h2>
                            <h2>{this.state.selectedPlace.college.state}</h2>
                            <h2>{this.state.selectedPlace.college.locale}</h2>
                            <h2>{this.numFormat(this.state.selectedPlace.college.population)}</h2>
                            <h2>{this.dateFormat(this.state.selectedPlace.college.regular_decision)}</h2>   
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