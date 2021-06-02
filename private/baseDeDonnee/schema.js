const mongoose = require('mongoose')
const { Timestamp } = require('mongodb')

const emailSchema = new mongoose.Schema({
    email: String,
}, { timestamps: true })

const adminAccountSchema = new mongoose.Schema({
    nameUser: String,
    keyword: String,
}, { timestamps: true })

const articleSchema = new mongoose.Schema({
    position: String,
    titre: String,
    contenu: String,
}, { timestamps: true })

module.exports = {
    Email: mongoose.model('email', emailSchema),
    Account: mongoose.model('adminAccount', adminAccountSchema),
    Article: mongoose.model('article', articleSchema)
}