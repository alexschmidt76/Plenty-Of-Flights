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
        req.session.userId = user.user_id
        console.log(req)
        res.json({ user })
    }
})

// log the user out of the session
auth.post('/log-out', (req, res) => {
    if (req.body.userId === req.session.userId) {
        req.session.userId = null
        res.json({
            message: `User id:${req.body.userId} successfully signed out.`
        })
    } else {
        res.status(401).json({
            message: 'No user signed out.'
        })
    }
})

// get the current signed in user from the session
auth.get('/profile', async (req, res) => {
    try {
        let user = await User.findOne({
            where: {user_id : req.session.userId}
        })
        res.json(user)
    } catch {
        res.json(null)
    }
})

module.exports = auth