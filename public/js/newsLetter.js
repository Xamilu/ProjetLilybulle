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
        setTimeout(async () => {
        emailList = await getEmails()
          for (let i = 0; i < emailList.length; i++) {
            const emailElement = emailList[i].email;
            if (emailElement == email.value){
              let params = {
                email: email.value,
                reset: `http://localhost:3000/html/resetNews.html?id=${emailList[i]._id}`,
            }
            await emailjs.send("service_4s4qmmf", "template_7dxsjge", params, "user_lmDYGxw2cx0QPO420I7IY")
            break
            }
          }
        }, 2000);
        errorMsgNewsletter("Vous êtes désormais abonné à notre newsLetter. Et un mail vous à été envoyé")
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
        setTimeout(async () => {
          emailList = await getEmails()
          for (let i = 0; i < emailList.length; i++) {
            const emailElement = emailList[i].email;
            if (emailElement == emailRes.value){
              console.log("Ici");
              let params = {
                email: emailRes.value,
                reset: `http://localhost:3000/html/resetNews.html?id=${emailElement.id}`,
            }
            await emailjs.send("service_4s4qmmf", "template_7dxsjge", params, "user_lmDYGxw2cx0QPO420I7IY")
            break
            }
          }
        }, 2000);
        errorMsgNewsletterRes("Vous êtes désormais abonné à notre newsLetter. Et un mail vous à été envoyé")
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
  