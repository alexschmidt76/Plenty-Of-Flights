import React from 'react';
import './App.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const containerStyle = {
    width: '80%',
    height: '50vh'
};

const center = {
    lat: 43.075,
    lng: -89.417
};

const departure = {
    lat: 43.139,
    long: 89.336
};

function Map() {
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyC-oQihkOLdHknEfoIXEccwuX1e-Vjld5U"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={6}
        >
            <Marker
                position={departure}
            />
        </GoogleMap>
      </LoadScript>
    )
  }

export default Map;
