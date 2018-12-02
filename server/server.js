require('./config/config.js')

const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')

const User = require('./models/user')
const Todo = require('./models/todo')

const users = require('./routes/users')    
const todos = require('./routes/todos')

// check and see if these are needed here..

// const _ = require('lodash')
// const { mongoose } = require('mongoose')
// const { ObjectId } = require('mongoose').Types

const authenticate = require('./middleware/authenticate')

const app = express()


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/todos', todos)
app.use('/users', users)

app.listen(process.env.PORT, () => 
    console.log(
        `express server running on port: ${process.env.PORT}`
    )
)

module.exports = { app }
