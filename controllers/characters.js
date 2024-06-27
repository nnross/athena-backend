const characterRouter = require('express').Router()
const fs = require('fs').promises;
const path = require('path');
const Character = require('../models/character')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

app.get('/api/data/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const item = await getItemById(id);
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to read data file' });
    }
});

const getTokenFrom = req => {
	const authorization = req.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
	  return authorization.replace('Bearer ', '')
	}
	return null
  }

blogsRouter.put('/', async (req, res) => {
    const { character } = req.body
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid'})
    }
    const user = await User.findById(decodedToken.id)

    const newCharacter = await Character.findById

})