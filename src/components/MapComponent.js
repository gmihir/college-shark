import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { Component } from 'react';

const { REACT_APP_API_KEY } = process.env;

export class MapComponent extends Component {

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