const taskRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken');

const getTokenFrom = req => {
	const authorization = req.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
	  return authorization.replace('Bearer ', '')
	}
	return null
  }

taskRouter.post('/', async (req, res) => {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    try {
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid'})
        }
        const user = await User.findById(decodedToken.id)

        user.tasks.push(req.body)
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'internal server error' })
    }
})

//working on it
taskRouter.delete('/', async (req,res) => {
    const { task } = req.body.task
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    try {
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid'})
        }
        const user = await User.findById(decodedToken.id)

        user.tasks.delete(task)
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'internal server error' })
    }
})

module.exports = taskRouter