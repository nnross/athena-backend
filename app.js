const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const loginRouter = require('./controllers/login')
const signupRouter = require('./controllers/signup')
require('dotenv').config()

const mongoUrl = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(mongoUrl)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message)
	})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(middleware.requestLogger)
app.use('/api/login', loginRouter)
app.use('/api/signup', signupRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app