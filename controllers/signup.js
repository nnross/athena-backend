const bcrypt = require('bcrypt')
const signupRouter = require('express').Router()
const User = require('../models/user')

signupRouter.post('/', async (req, res) => {
    const { username, password, email } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        passwordHash,
        email
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = signupRouter