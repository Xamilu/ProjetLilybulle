let email = document.querySelector('#newsLetterEmail');
let erreurMsgElement = document.querySelector('#newsLetterClassic .erreurMsg p')
let erreurMsgElementParent = document.querySelector('#newsLetterClassic .erreurMsg')

async function sendEmail(){
    await fetch('/db/createEmail', {
      method: 'POST',
      body: email.value,
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
    if (checkFormEmail()) {
      for (let i = 0; i < emailList.length; i++) {
        console.log(emailList[i].email);
        const emailElement = emailList[i].email;
        if (emailElement == email.value){
          errorMsgNewsletter("Cet E-mail est déjà abonné à notre newsLetter, vérifier peut-être vos spams si vous ne recevez rien.")
          existEmail = false
          break
        }
      }
      if (existEmail == true) {
        await sendEmail()
        errorMsgNewsletter("Vous êtes désormais abonné à notre newsLetter.")
        erreurMsgElementParent.style.color = 'green'
      }
    } else {
      errorMsgNewsletter("Votre E-mail n'est pas valide")
    }
  }
  
  function checkFormEmail() {
    let emailRegexp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    if (!emailRegexp.test(email.value)){
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
  