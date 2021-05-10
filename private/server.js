const { static } = require('express');
const express = require('express');
const database = require('./baseDeDonnee/connection');

// Server initiation
const app = express()
const port = 3000
app.listen(port, () => {
    console.log(`Server lancé sur le port ${port}`);
})
app.use(static('public'))
app.use(express.json())
app.use(express.text())

// Connexion à la base de données
database.connect
const Email = database.schemas.Email

//Creation d'un nouvel email
app.post('/db/createEmail', (req, res) => {
    const EmailData = req.body
    
    const createEmail = new Email({
        email: EmailData
    })
    createEmail.save()
    res.sendStatus(200)
})

// Récupérer toutes les adresses mail
app.get('/db/getEmails', (req,res) => {
    Email.find().then((data) => {
        res.send(data)
        res.sendStatus(200)
    })
})