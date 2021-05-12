let email = document.querySelector('#newsLetterEmail');
let erreurMsgElement = document.querySelector('#newsLetterClassic .erreurMsg p')
let erreurMsgElementParent = document.querySelector('#newsLetterClassic .erreurMsg')

let emailRes = document.querySelector('.respMail');
let erreurMsgElementRes = document.querySelector('.modal-content .erreurMsg p')
let erreurMsgElementParentRes = document.querySelector('.modal-content .erreurMsg')

async function sendEmail(email){
    await fetch('/db/createEmail', {
      method: 'POST',
      body: email,
    }).then()
  
    getEmails()
  }
  
  async function getEmails(){
    let emailsList
    await fetch('/db/getEmails')
    .then(response=> response.json())
    .then(emails => emailsList = emails)
  
    return emailsList
  }
  
  async function checkIfEmailExist() {
    let existEmail = true
    let emailList = await getEmails() 
    if (checkFormEmail(email.value)) {
      for (let i = 0; i < emailList.length; i++) {
        const emailElement = emailList[i].email;
        if (emailElement == email.value){
          errorMsgNewsletter("Cet E-mail est déjà abonné à notre newsLetter, vérifier peut-être vos spams si vous ne recevez rien.")
          existEmail = false
          break
        }
      }
      if (existEmail == true) {
        await sendEmail(email.value)
        errorMsgNewsletter("Vous êtes désormais abonné à notre newsLetter.")
        erreurMsgElementParent.style.color = 'green'
      }
    } else {
      errorMsgNewsletter("Votre E-mail n'est pas valide")
    }
  }

  async function checkIfEmailExistRes() {
    let existEmail = true
    let emailList = await getEmails() 
    if (checkFormEmail(emailRes.value)) {
      for (let i = 0; i < emailList.length; i++) {
        const emailElement = emailList[i].email;
        if (emailElement == emailRes.value){
          errorMsgNewsletterRes("Cet E-mail est déjà abonné à notre newsLetter, vérifier peut-être vos spams si vous ne recevez rien.")
          existEmail = false
          break
        }
      }
      if (existEmail == true) {
        await sendEmail(emailRes.value)
        errorMsgNewsletterRes("Vous êtes désormais abonné à notre newsLetter.")
        erreurMsgElementParentRes.style.color = 'green'
      }
    } else {
      errorMsgNewsletterRes("Votre E-mail n'est pas valide")
    }
  }
  
  function checkFormEmail(email) {
    let emailRegexp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    if (!emailRegexp.test(email)){
      return false
   }else {
     return true
   }
  }
  
  function errorMsgNewsletter(erreurMsg) {
    erreurMsgElement.innerHTML = erreurMsg
    erreurMsgElementParent.style.visibility = 'visible'
    erreurMsgElementParent.style.opacity = '1'
    erreurMsgElementParent.style.color = 'red'
  }
  function errorMsgNewsletterRes(erreurMsg) {
    erreurMsgElementRes.innerHTML = erreurMsg
    erreurMsgElementParentRes.style.visibility = 'visible'
    erreurMsgElementParentRes.style.opacity = '1'
    erreurMsgElementParentRes.style.color = 'red'
  }
  