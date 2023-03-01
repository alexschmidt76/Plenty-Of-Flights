import React, {Suspense} from 'react'
import { useNavigate } from "react-router"
import Button from 'react-bootstrap/Button';
import Spinner from './spinner';
// import FlightPath from './flightPath';
import Map from './Map';

export default function SearchResults () {

  const navigate = useNavigate()

  async function handleSave(e) {
		e.preventDefault()
		await fetch(`https://plenty-of-flights-backend.vercel.app/users/:id/flight-paths`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify()
		})
		navigate(`/`)
	}

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
            <Button variant="primary" type="submit" onClick={handleSave()}>
                  Save Flight
              </Button>
        </div>
    )
}