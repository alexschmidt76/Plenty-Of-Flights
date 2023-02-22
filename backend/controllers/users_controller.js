const users = require('express').Router()
const db = require('../models')
const { User } = db
// const { Op } = require('sequelize')
const bcrypt = require('bcrypt')

users.post('/', async (req, res) => {
    let { password, ...rest } = req.body
    const user = await User.create({
        ...rest,
        password: await bcrypt.hash(password, 10)
    })
    res.json(user)
})

module.exports = users