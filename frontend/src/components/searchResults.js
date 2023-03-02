import React, {useState, useContext, Suspense} from 'react'
import { useNavigate } from "react-router"
import Button from 'react-bootstrap/Button';
import Spinner from './spinner';
import {CurrentUser} from '../context/CurrentUser';

// import FlightPath from './flightPath';
import Map from './Map';

export default function SearchResults () {

  const navigate = useNavigate()
  const {currentUser} = useContext(CurrentUser)
  const [state, setState]=useState('')

  async function handleSave(e) {
		e.preventDefault()
    if(currentUser){
      setState('')
		  await fetch(`https://plenty-of-flights-backend.vercel.app/users/${currentUser.user_id}/flight-paths`, {
			  method: 'POST',
			  headers: {
				  'Content-Type': 'application/json'
			  },
			  body: JSON.stringify()
		  })
		  navigate(`/`)
	  }else setState("Please login/sign up to be able to save your search")
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
              {state===''?null:<p>state</p>}
        </div>
    )
}