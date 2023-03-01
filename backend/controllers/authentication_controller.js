// node dependencies
const bcrypt = require('bcryptjs')
const auth = require('express').Router()

// import db
const db = require('../models')
const { User } = db

// authenticate user login
auth.post('/', async (req, res) => {
    // find user with mathcing email
    let user = await User.findOne({
        where: { email: req.body.email }
    })

    // return error message if user does not exist or password is incorrect
    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({
            message: "Could not find a user with the provided email and password."
        })
    } else {
        res.json({ user })
    }
})

module.exports = auth