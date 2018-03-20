require('./config/config.js')

const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const _ = require('lodash')

const { mongoose } = require('./db/mongoose')
const { ObjectId } = require('mongoose').Types

const User = require('./models/user')
const Todo = require('./models/todo')
const authenticate = require('./middleware/authenticate')

const app = express()

const todos = require('./routes/todos')
const users = require('./routes/users')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/todos', todos)
app.use('/users', users)


app.listen(process.env.PORT, () => console.log(`express server running on port: ${process.env.PORT}`))

module.exports = { app }
