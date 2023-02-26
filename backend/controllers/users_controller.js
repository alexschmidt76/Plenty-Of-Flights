const users = require('express').Router()
const db = require('../models')
// const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')

const { User, FlightPath } = db

/* USER INFO ROUTES */

// get all users
users.get('/', async (req,  res) => {
    try {
        console.log('trying to find the users')
        const foundUsers = await User.findAll()
        console.log('users here:', foundUsers)
        res.json(foundUsers)
    } catch (error) {
        res.status(500).json({
            message: 'Database error',
            error
        })
    }
})


// create a new user
users.post('/', async (req, res) => {
    let { password, email, ...rest } = req.body
    
    // check if user already exists
    const foundUser = await User.findOne({
        where: { email: email }
    })
    
    if (!foundUser) {
        const user = await User.create({
            ...rest,
            email,
            passwordDigest: await bcrypt.hash(password, 10)
        })
        res.json(user)
    } else {
        res.status(403).json({
            message: "A user with this email already exists."
        })
    }
})

// delete a user
users.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.destroy({
            where: { user_id: Number(req.params.id) }
        })
        res.json({
            message: `Successfully deleted user id:${req.params.id}`
        })
    } catch (error) {
        res.status(500).json({
            message: 'No user was deleted',
            error
        })
    }
})

/* FLIGHT PATH ROUTES */

// get all flight paths of a user
users.get('/:id/flight-paths', async (req, res) => {
    try {
        const foundFlightPaths = await FlightPath.findAll({
            where: { user_id: req.params.id }
        })
        res.json(foundFlightPaths)
    } catch (error) {
        res.status(500).json({
            message: 'Database error',
            error
        })
    }
})

// create a new flight path
users.post('/:id/flight-paths', async (req, res) => {
    let { coords, aircraft_type, ...rest } = req.body
    
    // check if flight path already exists
    const foundPath = await FlightPath.findOne({
        where: { 
            coords: coords,
            aircraft_type: aircraft_type,
            user_id: Number(req.params.id)
        }
    })
    
    if (!foundPath) {
        const flightPath = await FlightPath.create({
            ...req.body,
            user_id: Number(req.params.id),
            date_created: new Date()
        })
        res.json(flightPath)
    } else {
        res.status(403).json({
            message: 'A flight path with this aircraft type and these flight coordinates already exists'
        })
    }
})

// get one flight path by id
users.get('/:userId/flight-paths/:pathId', async (req, res) => {
    try {
        const foundFlightPath = await FlightPath.findOne({
            where: { flight_path_id: req.params.pathId }
        })
        res.json(foundFlightPath)
    } catch (error) {
        res.status(500).json(error)
    }
})

// delete one flight path by id
users.delete('/:userId/flight-paths/:pathId', async (req, res) => {
    try {
        const deletedPath = await FlightPath.destroy({
            where: { 
                user_id: Number(req.params.userId),
                flight_path_id: Number(req.params.pathId) 
            }
        })
        res.json(`Successfully deleted flight path id:${req.params.pathId} from user id:${req.params.userId}`)
    } catch (error) {
        res.status(500).json({
            message: 'No flight path was deleted',
            error
        })
    }
})

module.exports = users