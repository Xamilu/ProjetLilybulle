const mongoose = require('mongoose')
const { Timestamp } = require('mongodb')

const emailSchema = new mongoose.Schema({
    email: String,
}, { timestamps: true })

module.exports = {
    Email: mongoose.model('email', emailSchema),
}