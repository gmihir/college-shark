import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import React, { Component } from 'react';

const { REACT_APP_API_KEY } = process.env;

const mapStyles = {
    width: '50%',
    height: '26.5vh'
  };

export class MapComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      return (
        <Map
          google={this.props.google}
          style={this.props.style}
          zoom={14}
          initialCenter={{
           lat: this.props.lat, 
           lng: this.props.lng
          }}
        >
            <Marker />
        </Map>
      );
    }
  }
 
export default GoogleApiWrapper({
    apiKey: REACT_APP_API_KEY
})(MapComponent);