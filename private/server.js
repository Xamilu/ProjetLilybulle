const { static } = require('express');
const bodyParser = require('body-parser');
const express = require('express');
const database = require('./baseDeDonnee/connexion');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express()
// Server initiation

const port = 3000
app.listen(port, () => {
    console.log(`Server lancé sur le port ${port}`);
})
app.use(static('public'))
app.use(express.json())
app.use(express.text())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set("view engine", "ejs");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'private/Assets')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
const assets = multer({ storage: storage });

// Connexion à la base de données
database.connect
const Email = database.schemas.Email
const AdminAccount = database.schemas.Account
const imgModel = database.schemas.Image

// Récupérer les images de la bdd
app.get('/db/getImages', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});

// Ajouter une images à la bdd
app.post('/db/addImage', assets.single('image'), (req, res, next) => {
    var obj = {
        name: req.body.nameFile,
        tags: req.body.tags,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/Assets/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else{
            res.sendStatus(200)
        }
    });
});

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

// Supprimer une adresse mail
app.post('/db/deleteEmail', async (req, res) => {
    const emailToDelete = await Email.findById(req.body)
    await emailToDelete.remove().then(() => res.sendStatus(200))
})

//Creation d'un nouvel admin account
app.post('/db/createAdminAccount', (req, res) => {   
    const NameUser = req.body.nameUser;
    const Keyword = req.body.keyword;
console.log(req.body)
console.log(Keyword)
    const createAdminAccount = new AdminAccount({
        nameUser : NameUser,
        keyword : Keyword
    })
    createAdminAccount.save()
    res.sendStatus(200)
})

// Récupérer toutes les admins account
app.get('/db/getAdminAccount', (req,res) => {
    AdminAccount.find().then((data) => {
        res.send(data)
    })
})