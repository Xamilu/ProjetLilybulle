const nameForm = document.querySelector("#nom")
const prenomForm = document.querySelector("#prenom")
const mailForm = document.querySelector("#mail")
const telForm = document.querySelector("#tel")
const objetMail = document.querySelector("#motif-select")
const msgMail = document.querySelector("#msg")

document.querySelector(".checkbox input").disabled = true;

document.querySelector('#submit').addEventListener('click', (event) => {

   event.preventDefault()

   let params = {
      nameSend: nameForm.value.toUpperCase(),
      firstName: prenomForm.value,
      notes: msgMail.value,
      objectMail: objetMail.value,
      tel: telForm.value,
      mel: mailForm.value
   }

   if (checkInputs()) {
      // emailjs.send("service_4s4qmmf", "template_v42qoim", params, "user_lmDYGxw2cx0QPO420I7IY")

      nameForm.value = ''
      prenomForm.value = ''
      msgMail.value = ''
      objetMail.value = "--Choix de l'Objet--"
      telForm.value = ''
      mailForm.value = ''
      document.getElementById('compteur').innerHTML = msg.value.length;

      document.querySelector(".checkbox input").checked = true;
   }
})

function checkInputs() {
   let emailRegexp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
   let telRegexp = /^[0-9]{2}.[0-9]{2}.[0-9]{2}.[0-9]{2}.[0-9]{2}$/
   if (nameForm.value.length < 2) {
      return false
   }
   else if (prenomForm.value.length < 2){
      return false
   }
   else if (!emailRegexp.test(mailForm.value)){
      return false
   }
   else if (msgMail.value.length < 50){
      return false
   }
   else if (!telRegexp.test(telForm.value)) {
      return false
   }
   else if (objetMail.value == "--Choix de l'Objet--") {
      return false
   }
   else {
      return true
   }
}