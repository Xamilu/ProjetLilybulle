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
const nodemailer = require('nodemailer');
const app = express()
// Server initiation

const port = 3000
app.listen(process.env.PORT || port, () => {
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

// Supprimer un article
app.post('/db/deleteArticle', async (req, res) => {
  const articleToDelete = await Article.findById(req.body)
  await articleToDelete.remove().then(() => res.sendStatus(200))
})


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'leo.gregori@edu.itescia.fr',
    pass: 'CodingPower25'
  }
});


app.post('/sendNewsLetterMail', (req, res) => {
  let body = JSON.parse(req.body)
  var mailNewsLetterOptions = {
    from: 'lilybulle@orange.fr',
    to: body.email,
    subject: 'Abonnements à la newsletter de Lilybulle',
    html: `<p>&nbsp;</p>
    <!-- [if (mso 16)]>
        <style type="text/css">
        a {text-decoration: none;}
        </style>
        <![endif]-->
    <p>&nbsp;</p>
    <!-- [if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <p>&nbsp;</p>
    <!-- [if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <p>&nbsp;</p>
    <!-- [if !mso]><!-- -->
    <p>&nbsp;</p>
    <!--<![endif]-->
    <div class="es-wrapper-color" style="background-color: #f6f6f6;"><!-- [if gte mso 9]>
          <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
            <v:fill type="tile" color="#f6f6f6"></v:fill>
          </v:background>
        <![endif]-->
    <table class="es-wrapper" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; padding: 0; margin: 0; width: 100%; height: 100%; background-repeat: repeat; background-position: center top;" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0;" valign="top">
    <table class="es-header" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; table-layout: fixed !important; width: 100%; background-color: transparent; background-repeat: repeat; background-position: center top;" cellspacing="0" cellpadding="0" align="center">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; background-color: #ffffff;" align="center" bgcolor="#ffffff">
    <table class="es-header-body" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; background-color: #ffffff; width: 600px;" cellspacing="0" cellpadding="0" align="center" bgcolor="#ffffff" data-darkreader-inline-bgcolor="">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; padding-top: 10px; padding-left: 40px; padding-right: 40px; background-color: #eeeeee;" align="left" bgcolor="#eeeeee">
    <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; width: 520px;" align="center" valign="top">
    <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; font-size: 0px;" align="center"><img class="adapt-img" style="display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" src="http://image.noelshack.com/fichiers/2021/19/3/1620828250-banderolelilybulle2.png" alt="" width="520" /></td>
    </tr>
    <tr>
    <td style="padding: 20px; margin: 0; font-size: 0;" align="center">
    <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0px; border-bottom: 3px solid #727272; background: none; height: 1px; width: 100%;">&nbsp;</td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table class="es-content" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; table-layout: fixed !important; width: 100%;" cellspacing="0" cellpadding="0" align="center">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; background-color: #ffffff;" align="center" bgcolor="#ffffff">
    <table class="es-content-body" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; background-color: #ffffff; width: 600px;" cellspacing="0" cellpadding="0" align="center" bgcolor="#ffffff">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; padding-left: 20px; padding-right: 20px; background-color: #eeeeee;" align="left" bgcolor="#eeeeee">
    <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; width: 560px;" align="center" valign="top">
    <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0;" align="center">
    <p style="margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'noticia text', georgia, 'times new roman', serif; line-height: 32px; color: #333333; font-size: 21px;">&nbsp;Bienvenue chez Lilybulle !</p>
    <p style="margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: arial, 'helvetica neue', helvetica, sans-serif; line-height: 21px; color: #333333; font-size: 14px; display: none;">&nbsp;</p>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table class="es-content" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; table-layout: fixed !important; width: 100%;" cellspacing="0" cellpadding="0" align="center">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; background-color: #ffffff;" align="center" bgcolor="#ffffff">
    <table class="es-content-body" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; background-color: #ffffff; width: 600px;" cellspacing="0" cellpadding="0" align="center" bgcolor="#ffffff" data-darkreader-inline-bgcolor="">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; padding-top: 5px; background-color: #eeeeee;" align="left" bgcolor="#EEEEEE">
    <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td class="es-m-p0r" style="padding: 0; margin: 0; width: 600px;" align="center" valign="top">
    <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; padding-top: 10px; padding-left: 20px; padding-right: 20px;" align="center">
    <p style="margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: 'noticia text', georgia, 'times new roman', serif; line-height: 26px; color: #333333; font-size: 17px;">Merci pour l'int&eacute;r&ecirc;t que vous nous portez. Vous &ecirc;tes d&eacute;sormais abonn&eacute;s &agrave; notre newsLetter. Cela vous permettra d'&ecirc;tre au courant avant tout le monde des derniers produits disponible dans notre boutique. C'est g&eacute;nial n'est-ce pas ? 😉</p>
    </td>
    </tr>
    <tr>
    <td style="margin: 0; font-size: 0; padding: 20px 40px 20px 40px;" align="center">
    <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0px; border-bottom: 3px solid #727272; background: none; height: 1px; width: 100%;">&nbsp;</td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table class="es-content" style="border-collapse: collapse; border-spacing: 0px; width: 100%; table-layout: fixed !important; height: 614px;" cellspacing="0" cellpadding="0" align="center">
    <tbody>
    <tr style="height: 614px;">
    <td style="padding: 0px; margin: 0px; background-color: #ffffff; height: 614px;" align="center" bgcolor="#ffffff">
    <table class="es-content-body" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; background-color: #ffffff; width: 600px;" cellspacing="0" cellpadding="0" align="center" bgcolor="#ffffff">
    <tbody>
    <tr>
    <td style="margin: 0; background-color: #eeeeee; padding: 20px 40px 30px 40px;" align="left" bgcolor="#eeeeee">
    <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; width: 520px;" align="center" valign="top">
    <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; font-size: 0px;" align="center"><img class="adapt-img" style="display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" src="http://image.noelshack.com/fichiers/2021/19/3/1620827767-carouselboutique2.jpg" alt="" height="493" /></td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    <tr>
    <td style="margin: 0; padding: 20px;" align="left">
    <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; width: 560px;" align="left">
    <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 20px; margin: 0; font-size: 0px;" align="center">
    <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0px; border-bottom: 0px solid #CCCCCC; background: none; height: 1px; width: 100%;">&nbsp;</td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table class="es-footer" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; table-layout: fixed !important; width: 100%; background-color: transparent; background-repeat: repeat; background-position: center top;" cellspacing="0" cellpadding="0" align="center">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; background-color: #333333;" align="center" bgcolor="#333333">
    <table class="es-footer-body" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px; background-color: #333333; width: 600px;" cellspacing="0" cellpadding="0" align="center" bgcolor="#333333" data-darkreader-inline-bgcolor="">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; padding-left: 20px; padding-right: 20px; background-color: #333333;" align="left" bgcolor="#333333">
    <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; width: 560px;" align="center" valign="top">
    <table style="border-collapse: collapse; border-spacing: 0px; height: 65px;" role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr style="height: 10px;">
    <td style="padding: 0px 0px 10px; margin: 0px; height: 10px;">
    <p style="margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: arial, 'helvetica neue', helvetica, sans-serif; line-height: 21px; color: #ffffff; font-size: 14px;">&nbsp;</p>
    </td>
    </tr>
    <tr style="height: 21px;">
    <td style="padding: 0px 0px 10px; margin: 0px; height: 21px;" align="center">
    <p style="margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: arial, 'helvetica neue', helvetica, sans-serif; line-height: 21px; color: #ffffff; font-size: 14px;">Vous n'&ecirc;tes pas &agrave; l'origine de cette demande ? Cliquez&nbsp;<span style="color: #ffffff;"><a style="color: #ffffff;" href="${body.reset}" target="_blank" rel="noopener">ici</a></span>&nbsp; pour annuler l'abonnement.</p>
    </td>
    </tr>
    <tr style="height: 34px;">
    <td style="padding: 15px 0px; margin: 0px; font-size: 0px; height: 34px;" align="center">
    <table class="es-table-not-adapt es-social" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" role="presentation" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; padding-right: 40px;" align="center" valign="top"><a style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; color: #ffffff; font-size: 14px;" href="https://www.facebook.com/Boutique-Lilybulle-564883753528910/?ref=page_internal" target="_blank" rel="noopener"><img style="display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" title="Facebook" src="https://poeikl.stripocdn.email/content/assets/img/social-icons/logo-white/facebook-logo-white.png" alt="Fb" width="32" height="32" /></a></td>
    <td style="padding: 0; margin: 0;" align="center" valign="top"><a style="-webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; text-decoration: underline; color: #ffffff; font-size: 14px;" href="https://www.instagram.com/lilybulle_/" target="_blank" rel="noopener"><img style="display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" title="Instagram" src="https://poeikl.stripocdn.email/content/assets/img/social-icons/logo-white/instagram-logo-white.png" alt="Inst" width="32" height="32" /></a></td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    <tr>
    <td style="padding: 0; margin: 0; padding-top: 10px; padding-left: 20px; padding-right: 20px; background-color: #333333;" align="left" bgcolor="#333333">
    <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; width: 560px;" align="center" valign="top">
    <table style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;" role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="padding: 0; margin: 0; padding-bottom: 5px;" align="center">
    <p style="margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: arial, 'helvetica neue', helvetica, sans-serif; line-height: 21px; color: #ffffff; font-size: 14px;">35 Grande rue &amp; 22 av des &eacute;curies 95290 L&rsquo;ISLE ADAM - Horaires d&rsquo;ouverture: <br />Mardi au Samedi 09h &agrave; 13h &amp; 14h30 &agrave; 19h - Dimanche 09h &agrave; 13h&nbsp;</p>
    </td>
    </tr>
    <tr>
    <td style="padding: 0px 0px 5px; margin: 0px;">
    <p style="margin: 0; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; mso-line-height-rule: exactly; font-family: arial, 'helvetica neue', helvetica, sans-serif; line-height: 21px; color: #ffffff; font-size: 14px;">&nbsp;</p>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </div>`
  }
  transporter.sendMail(mailNewsLetterOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
    }
  });
})

app.post('/sendContactMail', (req, res) => {
  let body = JSON.parse(req.body)
  var mailNewsLetterOptions = {
    from: 'lilybulle@orange.fr',
    to: 'lilybulle@orange.fr',
    subject: `${body.objectMail} de ${body.nameSend} ${body.firstName}`,
    html: `<p>Bonjour Lilybulle,</p>
    <p>Voici le message de ${body.nameSend} ${body.firstName}:</p>
    <p>&nbsp;</p>
    <blockquote>
    <p>${body.notes}</p>
    </blockquote>
    <p>&nbsp;</p>
    <p style="text-align: center;">Voici ses contacts :&nbsp;</p>
    <p style="text-align: center;">${body.firstName} ${body.nameSend}</p>
    <p style="text-align: center;">${body.tel}&nbsp;</p>
    <p style="text-align: center;">${body.mel}</p>
    <p>&nbsp;</p>`
  }
  transporter.sendMail(mailNewsLetterOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
    }
  })
})