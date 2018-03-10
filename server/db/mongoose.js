const mongoose = require('mongoose')

mongoose.Pomise = global.Promise

mongoose.connect(process.env.MONGOOSE_URI)
    .then(() => console.log('connection to MLAB established...'))
    .catch(err => console.log(`${err.name} \n there is an error with mongoose connect: ${err.errmsg}`))

module.exports = mongoose
