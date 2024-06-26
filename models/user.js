const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    passwordHash: String,
    tasks: [],
    characters: [],
    badges: [],
    friends: [],
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordhash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User