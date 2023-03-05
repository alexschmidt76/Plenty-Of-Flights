import React, {Suspense, useContext, useEffect, useState} from "react";
import { useParams } from "react-router";
import Spinner from "./spinner";
import Map from "./Map";
import {CurrentUser} from '../context/CurrentUser';

function ShowSavedFlight() {
    const {id} = useParams()
    const [pathName, setPathName] = useState()
    const [dap,setDap] = useState(null)
    const [aap,setAap] = useState(null)
    const {currentUser} = useContext(CurrentUser)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${currentUser.user_id}/flight-paths/${id}`)
            .then(res => res.json())
            .then(({departure_airport, arrival_airport, name}) => {
                setDap(JSON.parse(departure_airport))
                setAap(JSON.parse(arrival_airport))
                setPathName(name)
            })
    }, [currentUser, id])

    return (
        <div>
            <h1>{pathName}</h1>
            <Suspense fallback={<Spinner />}>
              {dap == null ? <p>Loading...</p> : <Map newFlight={false} dap={dap} aap={aap}/>}
            </Suspense>
        </div>
    )
}

export default ShowSavedFlight