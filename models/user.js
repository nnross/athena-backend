const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    tasks: [],
    characters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Character',
        },
    ],
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