import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import React, { Component } from 'react';

const { REACT_APP_API_KEY } = process.env;

const mapStyles = {
    width: '100%',
    height: '100%'
  };

export class MapComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      return (
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
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