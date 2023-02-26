import React from 'react';
import './App.css';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'

const containerStyle = {
    width: '80%',
    height: '50vh'
};

const center = {
    lat: 43.075,
    lng: -89.417
};

function Map() {
    const departure = {
        lat: 43.139,
        lng: -89.336
    };

    const arrival = {
        lat: 41.98,
        lng: -87.909
    };

    return (
      <LoadScript
        googleMapsApiKey="AIzaSyC-oQihkOLdHknEfoIXEccwuX1e-Vjld5U"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={6}
        >
        <MarkerF
            position={departure}
        />
        <MarkerF
            position={arrival}
        />
        </GoogleMap>
      </LoadScript>
    )
  }

export default Map;
