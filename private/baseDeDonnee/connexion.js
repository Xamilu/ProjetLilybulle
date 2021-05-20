const mongoose = require('mongoose')
const schemas = require('./schema')

const DB_URI = 'mongodb+srv://AdminPourTous:JkSOQDG6Kl2nIARk@cluster0.slkaw.mongodb.net/LilybulleDatabase?retryWrites=true&w=majority'

function connect(){
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => { console.log('Connecté à la base de données') })
    .catch((error) => { console.log(error) })
}

module.exports = {
    connect: connect(),
    schemas: {
        Email: schemas.Email,
        Account: schemas.Account,
        Image: schemas.Image
    }
}