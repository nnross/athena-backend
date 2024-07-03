const characterRouter = require('express').Router()
const fs = require('fs').promises;
const path = require('path');
const User = require('../models/user')
const jwt = require('jsonwebtoken');

const readCharacters = async (filePath) => {
    try {
        const characters = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(characters)
    } catch (error) {
        console.error('Error reading data file:', error)
        throw error
    }
};

const getCharacterById = async (id) => {
    const charactersFilePath = path.join(__dirname, '../data/characters.json')
    const characters = await readCharacters(charactersFilePath)
    return characters.find(character => character.id === id)
};

characterRouter.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10)
    try {
        const item = await getCharacterById(id)
        if (item) {
            res.json(item)
        } else {
            res.status(404).json({ error: 'Item not found' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to read data file' })
    }
});

const getTokenFrom = req => {
	const authorization = req.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
	  return authorization.replace('Bearer ', '')
	}
	return null
  }

characterRouter.post('/', async (req, res) => {
    const { character } = req.body
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    try {
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid'})
        }
        const user = await User.findById(decodedToken.id)

        const newCharacter = await getCharacterById(character)
        
        user.characters.push(newCharacter)
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'internal server error' })
    }
})

module.exports = characterRouter