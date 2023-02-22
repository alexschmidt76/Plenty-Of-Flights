const express = require('express')
require('pg')
const { Sequelize } = require('sequelize')
require('dotenv').config()
const PORT = process.env.PORT || 3001
const app = express()

app.get('/', (req, res) => {
    res.send('Welcome to Plenty of Flights backend API!')
})

app.get('/health', (req, res) => {
    res.send('call to /health successful')
})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

// Export the Express API for Vercel
module.exports = app;