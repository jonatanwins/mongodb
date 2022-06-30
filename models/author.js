const mongoose = require('mongoose')

// This is our data structure
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

// This is the name of our table
module.exports = mongoose.model('Author', authorSchema)