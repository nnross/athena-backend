const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String
    },
    tasks: [{
        title: {
            type: String,
            required: true
        },
        note: {
            type: String,
            required: false
        },
        time: {
            type: Number,
            required: true
        }
    }],
    characters: [{
        id: {
            type: Number,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        power: {
            type: Number,
            required: true
        }
    }],
    selectedCharacter: {
        type: Number
    },
    money: {
        type: Number
    },
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