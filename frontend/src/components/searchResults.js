import React, {Suspense} from 'react'
import Spinner from './spinner';
import FlightPath from './flightPath';

export default function SearchResults () {

    const renderFlight = () => {
          return(
            <Suspense fallback={<Spinner />}>
              <FlightPath/>  
            </Suspense>
          )
        }
      
    return(
        <div className="homepage">
            {renderFlight()}
        </div>
    )
}