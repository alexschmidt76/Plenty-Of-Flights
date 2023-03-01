import React, {Suspense} from 'react'
import Spinner from './spinner';
// import FlightPath from './flightPath';
import Map from './Map';

export default function SearchResults () {

    const renderFlight = () => {
          return(
            <Suspense fallback={<Spinner />}>
              <Map/>  
            </Suspense>
          )
        }
      
    return(
        <div className="homepage">
            {renderFlight()}
        </div>
    )
}