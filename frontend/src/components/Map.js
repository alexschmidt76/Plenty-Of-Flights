import React, {useContext} from 'react';
import '../App.css';
import { GoogleMap, LoadScript, MarkerF, PolylineF, useJsApiLoader} from '@react-google-maps/api'
import { DataContext } from '../context/dataContext'
import Spinner from './spinner';

const containerStyle = {
    width: '80%',
    height: '50vh'
};

function Map() {
  const {dap,aap} = useContext(DataContext)

  const loadDap = dap.result.read()
  const loadAap = aap.result.read()

  function locateCenter(){
    let radLatDap = (loadDap.latitude_deg * Math.PI) / 180
    let radLonDap = (loadDap.longitude_deg * Math.PI) / 180
    let radLatAap = (loadAap.latitude_deg * Math.PI) / 180
    let radLonAap = (loadAap.longitude_deg * Math.PI) / 180
    
    let Dap_X = Math.cos(radLatDap) * Math.cos(radLonDap)
    let Dap_Y = Math.cos(radLatDap) * Math.sin(radLonDap)

    let Aap_X = Math.cos(radLatAap) * Math.cos(radLonAap)
    let Aap_Y = Math.cos(radLatAap) * Math.sin(radLonAap)

    let X = (Dap_X + Aap_X) / 2
    let Y = (Dap_Y + Aap_Y) / 2
    let Z = (Math.sin(radLatDap) + Math.sin(radLatAap)) / 2

    let centralLongitude = Math.atan2(Y, X);
    let centralSquareRoot = Math.sqrt((X * X) + (Y * Y));
    let centralLatitude = Math.atan2(Z, centralSquareRoot);
    console.log((centralLatitude * 180) / Math.PI)

    return [(centralLatitude * 180) / Math.PI, (centralLongitude * 180) / Math.PI]

  }

    const departure = {
        lat: loadDap.latitude_deg,
        lng: loadDap.longitude_deg
    };

    const arrival = {
      lat: loadAap.latitude_deg,
      lng: loadAap.longitude_deg
    };

    const calculatedCenter = locateCenter()

    const center = {
      lat: calculatedCenter[0],
      lng: calculatedCenter[1]
    }

    const path = [
      departure,
      arrival
    ];
    
    const options = {
      strokeColor: "#0066ff"
    };
    
    const { isLoaded, loadError } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: 'AIzaSyC-oQihkOLdHknEfoIXEccwuX1e-Vjld5U'
      // libraries: ['geometry', 'drawing'],
    });

    const renderMap = () => {
      return <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
      >
          <MarkerF
            position={departure}
          />
        <MarkerF
            position={arrival}
        />
        <PolylineF
            path={path}
            options={options}
        />
      </GoogleMap>
    }

    if (loadError) {
      return <div>There is an issue loading the map. Please try again.</div>
    }

    return isLoaded ? renderMap() : <Spinner />
  }

export default Map;
