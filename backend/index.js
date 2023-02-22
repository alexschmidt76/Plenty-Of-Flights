const express = require('express')
const { Sequelize } = require('sequelize')
require('dotenv').config()

const PORT = process.env.PORT || 3001

// SEQUELIZE CONNECTION
const sequelize = new Sequelize(process.env.DATABASE_URL)

const app = express()

app.use('/health', (req, res) => {
    res.send('call to /health successful')
})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

// Export the Express API for Vercel
module.exports = app;