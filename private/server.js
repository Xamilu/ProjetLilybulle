const { static } = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const express = require('express');
const database = require('./baseDeDonnee/connexion');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const app = express()
// Server initiation

const port = 3000
app.listen(port, () => {
    console.log(`Server lancé sur le port ${port}`);
})

app.use(bodyParser.json());
app.use(express.json())
app.use(express.text())
app.use(static('public'))
app.use(methodOverride('_method'));

const DB_URI = 'mongodb+srv://AdminPourTous:JkSOQDG6Kl2nIARk@cluster0.slkaw.mongodb.net/LilybulleDatabase?retryWrites=true&w=majority'

// Connexion à la base de données
const conn = mongoose.createConnection(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

database.connect
const Email = database.schemas.Email
const AdminAccount = database.schemas.Account
const Article = database.schemas.Article

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});

// Create storage engine
const storage = new GridFsStorage({
    url: DB_URI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            metadata: JSON.parse(req.body.params),
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });

  const upload = multer({ storage });

// Récupérer les images de la bdd
app.get('/db/getImages', (req, res) => {
  gfs.find().sort({ "metadata.tags.position": -1}).toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    res.send(files);
  });
});

app.get('/image/:filename', (req, res) => {
  gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    if (files[0].contentType === 'image/png' || files[0].contentType === 'image/jpeg') {
      gfs.openDownloadStreamByName(req.params.filename).pipe(res)
    } 
  })
  
});
// Ajouter une image à la bdd
app.post('/db/addImage',upload.any("file"), (req, res) => {
    // // res.json({ file: req.file });
    // res.redirect('/db/getImages');
    res.sendStatus(200)
});

// Supprimer une image
app.delete('/db/deleteImage', async (req, res) => {
  try{
    const obj_id = new mongoose.Types.ObjectId(JSON.parse(req.body).id);
      gfs.delete(obj_id);
      res.sendStatus(200)
    } catch (err) {
      console.log(err.message);
      res.status(500)
    }
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

// Envoyer l'article à la BDD
app.post('/db/createArticle', (req, res) => {
  const body = JSON.parse(req.body);
  const position = body.position;
  const titreData = body.titre;
  const contenuData = body.contenu;
  console.log(position)
  console.log(titreData)
  console.log(contenuData)
  
  const createArticle = new Article({
      position: position,
      titre: titreData,
      contenu: contenuData
  })
  createArticle.save()
  res.sendStatus(200)
})

// Récupérer l'article de la BDD
app.get('/db/getArticle', (req,res) => {
  Article.find().then((data) => {
      res.send(data)
  })
})
