import React, {Suspense, useContext, useEffect, useState} from "react";
import { useParams } from "react-router";
import Spinner from "./spinner";
import Map from "./Map";
import {CurrentUser} from '../context/CurrentUser';

function ShowSavedFlight(setDap, setAap) {
    const {id} = useParams()
    const [pathName, setPathName] = useState()
    const {currentUser} = useContext(CurrentUser)

    useEffect(() => {
        fetch(`https://plenty-of-flights-backend.vercel.app/users/${currentUser.user_id}/flight-paths/${id}`)
            .then(res => res.json())
            .then(({departure_airport, arrival_airport, name}) => {
                setDap(departure_airport)
                setAap(arrival_airport)
                setPathName(name)
            })
    }, [])

    return (
        <div>
            <h1>{pathName}</h1>
            <Suspense fallback={<Spinner />}>
              <Map newFlight={false} />
            </Suspense>
        </div>
    )
}

export default ShowSavedFlight