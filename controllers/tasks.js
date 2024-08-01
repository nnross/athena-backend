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
        const taskIndex = user.tasks.findIndex((task) => task._id.toString() === req.body.remove)
        const taskTime = user.tasks[taskIndex].time;
        const done = req.body.done
        
        if (taskIndex === -1) {
            return res.status(404).json({ error: 'task not found' });
        }
        if (done === false && user.money >= 20) {
            user.money -= 20
        } if (done === false && user.money < 20) {
            return res.status(403).json({ error: 'not sufficient funds' })
        } else {
            user.money += taskTime / 2
        }
        
        user.tasks.splice(taskIndex, 1);
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'internal server error' })
    }
})

module.exports = taskRouter