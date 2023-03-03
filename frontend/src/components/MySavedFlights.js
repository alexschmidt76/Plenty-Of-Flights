import React, {useEffect, useState, useContext} from 'react'
import { useNavigate } from "react-router"
import Button from 'react-bootstrap/Button';
import {CurrentUser} from '../context/CurrentUser';

function MySavedFlights(){
    const navigate = useNavigate()
    const {currentUser} = useContext(CurrentUser)
    const [flightPaths, setFlightPaths]=useState([])

    useEffect(() =>{
        fetch(`https://plenty-of-flights-backend.vercel.app/users/${currentUser.user_id}/flight-paths`)
            .then(res =>res.json()).then(resData=>setFlightPaths(resData))
    }, [currentUser]
    )
    async function handleDelete(pathid){
        await fetch(`https://plenty-of-flights-backend.vercel.app/users/${currentUser.user_id}/flight-paths/${pathid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
        }
        })
    }

    async function handleShow(pathid){
        await fetch(`https://plenty-of-flights-backend.vercel.app/users/${currentUser.user_id}/flight-paths/${pathid}`)
    }

    const flightPathNames=()=>{
        return flightPaths.map(path=>(
            <li>
                {path.name}
                <Button onClick={handleDelete(path.flight_path_id)}>Delete Flight</Button>
                <Button onClick={handleShow(path.flight_path_id)}>Show the Flight</Button>
            </li>
            ))
    }

    return(
        <div>
            <ul>
                {flightPathNames()}
            </ul>
        </div>
    )
}
export default MySavedFlights