const bcrypt = require('bcrypt')
const signupRouter = require('express').Router()
const User = require('../models/user')

signupRouter.post('/username', async (req, res) => {
    const { username } = req.body
    console.log(req.body)
    try {
        const user = await User.findOne({ username })
        if (user) {
            return res.send(true)
        } else {
            return res.send(false)
        }
    } catch (error) {
        console.error('Error checking username:', error);
        return res.status(500).json({ error: 'Server error' });
    }
})

signupRouter.post('/email', async (req, res) => {
    const { email } = req.body
    console.log(req.body)
    try {
        const user = await User.findOne({ email })
        if (user) {
            return res.send(true)
        } else {
            return res.send(false)
        }
    } catch (error) {
        console.error('Error checking email:', error);
        return res.status(500).json({ error: 'Server error' });
    }
})

signupRouter.post('/', async (req, res) => {
    const { username, email, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        email,
        passwordHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = signupRouter