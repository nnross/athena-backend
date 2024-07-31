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

taskRouter.get('/', async (req,res) => {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    try {
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid'})
        }
        const user = await User.findById(decodedToken.id)

        const taskList = user.tasks
        res.status(201).json(taskList)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'internal server error'})
    }
})

taskRouter.delete('/', async (req,res) => {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    try {
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid'})
        }
        const user = await User.findById(decodedToken.id)
        
        const taskIndex = user.tasks.findIndex((task) => task._id === req.body.remove);
        
        user.tasks.splice(taskIndex, 1);
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'internal server error' })
    }
})

module.exports = taskRouter