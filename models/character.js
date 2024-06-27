const mongoose = require('mongoose')

const characterSchema = new mongoose.Schema({
    id: Number,
	name: String,
    power: Number,
})

characterSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Character', characterSchema)