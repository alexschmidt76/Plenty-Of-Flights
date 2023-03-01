import React, {useContext} from 'react';
import '../App.css';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import { DataContext } from '../context/dataContext'

const containerStyle = {
    width: '80%',
    height: '50vh'
};

const center = {
    lat: 43.075,
    lng: -89.417
};

function Map() {
  const {dap,aap} = useContext(DataContext)

  const loadDap = dap.result.read()
  const loadAap = aap.result.read()

    const departure = {
        lat: loadDap.latitude_deg,
        lng: loadDap.longitude_deg
    };

    const arrival = {
      lat: loadAap.latitude_deg,
      lng: loadAap.longitude_deg
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
