const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema.Types
 
const TodoSchema = new mongoose.Schema({
    text: {
        type: String,
        unique: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date,
        default: null
    },
    _creator: {
        type: ObjectId,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})


const Todo = mongoose.model('Todos', TodoSchema)

module.exports = Todo