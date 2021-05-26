const mongoose = require('mongoose')
const { Timestamp } = require('mongodb')

const emailSchema = new mongoose.Schema({
    email: String,
}, { timestamps: true })

const adminAccountSchema = new mongoose.Schema({
    nameUser: String,
    keyword: String,
}, { timestamps: true })

var boutiqueImageSchema = new mongoose.Schema({
    name: String,
    tags: {
        categorie: String,
        sousCategorie: String,
        position: Number
    },
    img:
    {
        data: String,
        contentType: String
    }
}, { timestamps: true });

var atelierImageSchema = new mongoose.Schema({
    name: String,
    tags: {
        categorie: String,
        sousCategorie: String,
        position: Number
    },
    img:
    {
        data: String,
        contentType: String
    }
}, { timestamps: true });

var agenceImageSchema = new mongoose.Schema({
    name: String,
    tags: {
        categorie: String,
        sousCategorie: String,
        position: Number
    },
    img:
    {
        data: String,
        contentType: String
    }
}, { timestamps: true });

var caravaneImageSchema = new mongoose.Schema({
    name: String,
    tags: {
        categorie: String,
        sousCategorie: String,
        position: Number
    },
    img:
    {
        data: String,
        contentType: String
    }
}, { timestamps: true });

module.exports = {
    Email: mongoose.model('email', emailSchema),
    Account: mongoose.model('adminAccount', adminAccountSchema),
    BoutiqueImage: mongoose.model('boutiqueImage', boutiqueImageSchema),
    AtelierImage: mongoose.model('atelierImage', atelierImageSchema),
    AgenceImage: mongoose.model('agenceImage', agenceImageSchema),
    CaravaneImage: mongoose.model('caravaneImage', caravaneImageSchema)
}