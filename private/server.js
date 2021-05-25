const { static } = require('express');
const bodyParser = require('body-parser');
const express = require('express');
const database = require('./baseDeDonnee/connexion');
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

// Connexion à la base de données
database.connect
const Email = database.schemas.Email
const AdminAccount = database.schemas.Account
const boutiqueImgModel = database.schemas.BoutiqueImage
const atelierImgModel = database.schemas.AtelierImage
const agenceImgModel = database.schemas.AgenceImage
const caravaneImgModel = database.schemas.CaravaneImage

const multer = require("multer");
const upload = multer({ dest: "private/uploads/" });

// Récupérer les images de la bdd
app.get('/db/getboutiqueImages', (req, res) => {
    boutiqueImgModel.find({}, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.send(data);
        }
    }).sort({tags: 1});;
});
app.get('/db/getatelierImages', (req, res) => {
    atelierImgModel.find({}, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.send(data);
        }
    }).sort({tags: 1});;
});
app.get('/db/getagenceImages', (req, res) => {
    agenceImgModel.find({}, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.send(data);
        }
    }).sort({tags: 1});
});
app.get('/db/getcaravaneImages', (req, res) => {
    caravaneImgModel.find({}, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.send(data);
        }
    }).sort({tags: 1});;
});

// Ajouter une image à la bdd
app.post('/db/addboutiqueImage',upload.any("image"), (req, res) => {
    let body = JSON.parse(req.body.params)
    var obj = {
        name: body.nameFile,
        tags: body.tags,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' +  req.files[0].filename)),
            contentType: 'image/png'
        }
    }
    boutiqueImgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else{
            res.sendStatus(200)
        }
    });
});
app.post('/db/addatelierImage',upload.any("image"), (req, res) => {
    let body = JSON.parse(req.body.params)
    var obj = {
        name: body.nameFile,
        tags: body.tags,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' +  req.files[0].filename)),
            contentType: 'image/png'
        }
    }
    atelierImgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else{
            res.sendStatus(200)
        }
    });
});
app.post('/db/addagenceImage',upload.any("image"), (req, res) => {
    let body = JSON.parse(req.body.params)
    var obj = {
        name: body.nameFile,
        tags: body.tags,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' +  req.files[0].filename)),
            contentType: 'image/png'
        }
    }
    agenceImgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else{
            res.sendStatus(200)
        }
    });
});
app.post('/db/addcaravaneImage',upload.any("image"), (req, res) => {
    let body = JSON.parse(req.body.params)
    var obj = {
        name: body.nameFile,
        tags: body.tags,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' +  req.files[0].filename)),
            contentType: 'image/png'
        }
    }
    caravaneImgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else{
            res.sendStatus(200)
        }
    });
});

// Supprimer une image
app.post('/db/deleteboutiqueImage', async (req, res) => {
    let body = JSON.parse(req.body)
    let list = await caravaneImgModel.find()
    for (let i = 0; i < list.length; i++) {
        const image = list[i];
        if (image.tags.sousCategorie == body.sousCategorie && image.tags.position == body.position) {
            image.remove()
        }
    }
    res.sendStatus(200)
})
app.post('/db/deleteatelierImage', async (req, res) => {
    let body = JSON.parse(req.body)
    let list = await caravaneImgModel.find()
    for (let i = 0; i < list.length; i++) {
        const image = list[i];
        if (image.tags.sousCategorie == body.sousCategorie && image.tags.position == body.position) {
            image.remove()
        }
    }
    res.sendStatus(200)
})
app.post('/db/deleteagenceImage', async (req, res) => {
    let body = JSON.parse(req.body)
    let list = await caravaneImgModel.find()
    for (let i = 0; i < list.length; i++) {
        const image = list[i];
        if (image.tags.sousCategorie == body.sousCategorie && image.tags.position == body.position) {
            image.remove()
        }
    }
    res.sendStatus(200)
})
app.post('/db/deletecaravaneImage', async (req, res) => {
    let body = JSON.parse(req.body)
    let list = await caravaneImgModel.find()
    for (let i = 0; i < list.length; i++) {
        const image = list[i];
        if (image.tags.sousCategorie == body.sousCategorie && image.tags.position == body.position) {
            image.remove()
        }
    }
    res.sendStatus(200)
})


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