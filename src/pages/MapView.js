import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import React, { Component } from 'react';
import NavBar from '../components/content/Navbar';
import '../css/MapView.css';

const { REACT_APP_API_KEY } = process.env;

const mapStyles = {
    float: 'right',
    position: 'static',
    width: '80%',
    height: 'auto',
    minHeight: '92vh'
  };

export class MapView extends Component {
    constructor(props) {
        super(props);

        this.state = {
          resultsFromSearch: [],
          searchBar: false
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
    
    render() {
    var points = [
        { lat: 42.02, lng: -77.01 },
        { lat: 42.03, lng: -77.02 },
        { lat: 41.03, lng: -77.04 },
        { lat: 42.05, lng: -77.02 }
    ]
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
    bounds.extend(points[i]);
    }
      return (
        <div className="mapview-container">
            <NavBar searchBarInUse={this.searchBarInUse} setSearch={this.setSearch} searchBar={this.state.searchBar} active="2" 
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
                    bounds={bounds}
                >
                    <Marker name={'USD'} title={"UCSD"} position={{lat: 41, lng: -72}}/>
                    <Marker title={"UCSD"} position={{lat: 31, lng: -92}}/>
                    <Marker
                        name={'Your position'}
                        position={{lat: 37.762391, lng: -122.439192}}
                        icon={{
                            url: "./UCSD_3.jpg",
                            anchor: new this.props.google.maps.Point(32,32),
                            scaledSize: new this.props.google.maps.Size(64,64)
                        }} />
                </Map>
            </section>
        </div>
      );
    }
  }
 
export default GoogleApiWrapper({
    apiKey: REACT_APP_API_KEY
})(MapView);