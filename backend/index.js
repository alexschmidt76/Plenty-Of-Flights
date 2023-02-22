// modules and globals
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

// express settings
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

// sequelize and postgres
require('pg')
const { Sequelize } = require('sequelize')

// define port
const PORT = process.env.PORT || 3001

// controllers and routes
app.get('/', (req, res) => {
    res.send('Welcome to Plenty of Flights backend API!')
})

app.use('/users', require('./controllers/users_controller'))
app.use('/authentication', require('./controllers/authentication_controller'))

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

// Export the Express API for Vercel
module.exports = app;