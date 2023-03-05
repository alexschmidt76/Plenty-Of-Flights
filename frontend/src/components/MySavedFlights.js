import React, {useEffect, useState, useContext} from 'react'
import { useNavigate } from "react-router"
import Button from 'react-bootstrap/Button';
import {CurrentUser} from '../context/CurrentUser';

function MySavedFlights(){
    const navigate = useNavigate()
    const {currentUser} = useContext(CurrentUser)
    const [flightPaths, setFlightPaths]=useState([])

    useEffect(() =>{
        if (currentUser !== null) {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${currentUser.user_id}/flight-paths`)
                .then(res => res.json())
                .then(resData => {
                    setFlightPaths(resData)
                })
        }
    }, [currentUser])

    async function handleDelete(e, pathid){
        e.preventDefault()
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${currentUser.user_id}/flight-paths/${pathid}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
        }
        })
    }

    async function handleShow(e, pathid){
        e.preventDefault()
        navigate(`/mysavedflights/${pathid}`)
    }

    const flightPathNames=()=>{
        if (currentUser === null) {
            navigate('/')
        } else if (flightPaths.length === 0) {
            return <p>You have no saved flights!</p>
        } else {
            return flightPaths.map(({name, flight_path_id})=>(
                <li>
                    {name}
                    <Button onClick={(e)=>handleDelete(e, flight_path_id)}>Delete Flight</Button>
                    <Button onClick={(e)=>handleShow(e, flight_path_id)}>Show the Flight</Button>
                    
                </li>
            ))
        }
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