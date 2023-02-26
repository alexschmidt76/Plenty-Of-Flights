// modules and globals
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('pg')

// express settings
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

// define port
const PORT = process.env.PORT || 3001

/* CONTROLLERS AND ROUTES */

// landing page port
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Plenty of Flights backend API!'
    })
})

// verify the connection to the database
app.get('/verify-connection', async (req, res) => {
    const db = require('./models')
    try {
        await db.sequelize.authenticate()
        res.json({
            message: 'Connection has been established successfully.'
        })
    } catch(error) {
        res.status(502).json({
            message: 'Uncable to connect to the database.',
            error
        })
    }
})

// test db connection route
app.get('/test', async (req, res) => {
    const db = require('./models')
    console.log(db)
    const within = async (fn, res, duration) => {
        const id = setTimeout(() => res.json({
            message: "There was an error with the upstream service!"
        }), duration)

        try {
            let data = await fn()
            clearTimeout(id)
            res.json(data)
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
    const getUsers = async () => {
        return await db.User.findAll()
    }
    await within(getUsers, res, 7000)
})  

// controllers
app.use('/users', require('./controllers/users_controller'))
app.use('/authentication', require('./controllers/authentication_controller'))

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

// Export the Express API for Vercel
module.exports = app;