// modules and globals
require('dotenv').config()
require('pg')

const express = require('express')
const app = express()

const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const cors = require('cors')

// express settings
app.use(cookieSession({
    name: 'session',
    sameSite: false,
    httpOnly: true,
    secure: true,
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

// define port
const PORT = process.env.PORT || 3001

/* CONTROLLERS AND ROUTES */

// landing page route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Plenty of Flights backend API!'
    })
})

// controllers
app.use('/users', require('./controllers/users_controller'))
app.use('/authentication', require('./controllers/authentication_controller'))

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

// Export the Express API for Vercel
module.exports = app;