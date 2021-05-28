const mongoose = require('mongoose')
const schemas = require('./schema')

const DB_URI = 'mongodb+srv://AdminPourTous:JkSOQDG6Kl2nIARk@cluster0.slkaw.mongodb.net/LilybulleDatabase?retryWrites=true&w=majority'

async function connect(){
    await mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => { console.log('Connecté à la base de données') })
    .catch((error) => { console.log(error) })
}

module.exports = {
    connect: connect(),
    schemas: {
        Email: schemas.Email,
        Account: schemas.Account,
        BoutiqueImage: schemas.BoutiqueImage,
        AtelierImage: schemas.AtelierImage,
        AgenceImage: schemas.AgenceImage,
        CaravaneImage: schemas.CaravaneImage
    }
}