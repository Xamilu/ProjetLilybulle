const { static } = require('express');
const express = require('express');
const database = require('./baseDeDonnee/connexion');
const app = express()
// Server initiation

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
const AdminAccount = database.schemas.Account

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
    })
})




//Creation d'un nouvel admin account
app.post('/db/createAdminAccount', (req, res) => {   
    const NameUser = req.body.nameUser;
    const Keyword = req.body.keyword;
console.log(NameUser)
console.log(Keyword)
    const createAdminAccount = new AdminAccount({
        nameUser : NameUser,
        keyword : Keyword

    })
    createAdminAccount.save()
    res.sendStatus(200)
})

// Récupérer toutes les admins account
app.get('/db/getAdminAcount', (req,res) => {
    AdminAccount.find().then((data) => {
        res.send(data)
    })
})