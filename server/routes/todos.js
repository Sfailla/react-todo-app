const express = require('express')
const _ = require('lodash')

const { mongoose } = require('../db/mongoose')
const { ObjectId } = require('mongoose').Types

// const User = require('../models/users')
const Todo = require('../models/todo')
const authenticate = require('../middleware/authenticate')

const router = express.Router()


// POST route for making a TODO
router.post('/', authenticate, (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    })
    todo.save()
        .then(doc => res.send(doc))
        .catch(err => res.status(400).send(err))
})
// GET route for listing all TODOs
router.get('/', authenticate, (req, res) => {
    Todo.find({ _creator: req.user._id })
        .then(todos => {
            res.send({ todos })
        }).catch(err => {
            res.status(400).send(err)
        })
})
// GET route for single TODO by ID
router.get('/:id', authenticate, (req, res) => {
    const { id } = req.params
    if (!ObjectId.isValid(id)) {
        return res.status(404).send()
    }
    Todo.findOne({
        _id: id,
        _creator: req.user._id
    })
        .then(todo => {
            if (!todo) return res.status(400).send()
            res.send({ todo })
        })
        .catch(err => res.status(400).send(err))
})
// DELETE route for removing TODO by ID
router.delete('/:id', authenticate, (req, res) => {
    const { id } = req.params
    if (!ObjectId.isValid(id)) {
        return res.status(404).send()
    }
    Todo.findByIdAndRemove(id)
        .then(todo => {
            if (!todo) return res.status(404).send('todo not found')
            res.status(200).send(todo)
        })
        .catch(err => res.status(400).send(err))
})

router.put('/:id', authenticate, (req, res) => {
    const { id } = req.params
    // using pick from lodash is very useful when dealing with 
    // sending user info.  it allows you to pick the items 
    // the user has access to. rather than give access to entire obj
    const body = _.pick(req.body, ['text', 'completed'])

    if (!ObjectId.isValid(id)) {
        return res.status(404).send()
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime()
    } else {
        body.completed = false
        body.completedAt = null
    }
    Todo.findOneAndUpdate({ _id: id, _creator: req.user._id},
        { $set: body }, { new: true })
        .then(todo => {
            if (!todo) {
                return res.status(404).send()
            }
            res.send({ todo })
        })
})

module.exports = router