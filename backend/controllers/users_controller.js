// node dependencies
const bcrypt = require('bcryptjs')
const users = require('express').Router()

// import db
const db = require('../models')
const { User, FlightPath } = db

/* USER INFO ROUTES */

// get all users
users.get('/', async (req,  res) => {
    try {
        const foundUsers = await User.findAll()
        res.json(foundUsers)
    } catch (error) {
        res.status(500).json({
            message: 'Database error',
            error: error
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
        // sign in new user upon creation
        req.session.userId = user.user_id
        res.json(user)
    } else {
        res.status(403).json({
            message: "A user with this email already exists."
        })
    }
})

// update a user
users.put('/:id', async (req, res) => {
    if (req.session.userId === Number(req.params.id)) {
        try {
            const updatedUser = await User.update({
                name: req.body.name,
                email: req.body.email,
                passwordDigest: await bcrypt.hash(req.body.password, 10)
            },
            {
                where: { user_id: Number(req.params.id) }
            })
            res.json({
                message: `Successfully updated user id:${req.params.id}`
            })
        } catch {
            res.status(500).json({
                message: 'No user was updated.',
                error
            })
        }
    } else {
        res.status(401).json({
            message: 'No user was updated.'
        })
    }
})

// delete a user
users.delete('/:id', async (req, res) => {
    if (req.session.userId === Number(req.params.id)) {
        try {
            const deletedUser = await User.destroy({
                where: { user_id: Number(req.params.id) }
            })
            req.session.userId = null
            res.json({
                message: `Successfully deleted user id:${req.params.id}`
            })
        } catch (error) {
            res.status(500).json({
                message: 'No user was deleted',
                error
            })
        }
    } else {
        res.status(401).json({
            message: 'No user was deleted'
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
    /* res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" }) */
    let {dap, aap} = req.body

    const flightPath = await FlightPath.create({
        user_id: req.params.id,
        name: `${dap.name} to ${aap.name}`,
        departure_airport: JSON.stringify(dap),
        arrival_airport: JSON.stringify(aap),
        date_created: new Date()
    })
    res.json(flightPath)
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
    if (req.session.userId === req.params.userId) {
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
    } else {
        res.status(401).json({
            message: 'No flight path was deleted'
        })
    }
})

module.exports = users