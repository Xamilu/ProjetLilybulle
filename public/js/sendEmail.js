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
      emailjs.send("service_4s4qmmf", "template_v42qoim", params, "user_lmDYGxw2cx0QPO420I7IY")

      nameForm.value = ''
      nameForm.style.border = "none"
      prenomForm.value = ''
      prenomForm.style.border = "none"
      msgMail.value = ''
      msgMail.style.border = "none"
      objetMail.value = "--Choix de l'Objet--"
      objetMail.style.border = "none"
      telForm.value = ''
      telForm.style.border = "none"
      mailForm.value = ''
      mailForm.style.border = "none"
      document.getElementById('compteur').innerHTML = msg.value.length;

      document.querySelector(".checkmark").classList.remove('checked')
      document.querySelector(".checkmark .checkmark__circle").classList.remove('checked')
      document.querySelector(".checkmark .checkmark__check").classList.remove('checked')
      document.querySelector(".checkbox").style.visibility = "visible"
      document.querySelector(".checkbox input").checked = true;
      document.querySelector(".errorMsg").style.visibility = "hidden"
   } 
   else {
      document.querySelector(".checkbox input").checked = false;
      document.querySelector(".checkmark").classList.add('checked')
      document.querySelector(".checkmark .checkmark__circle").classList.add('checked')
      document.querySelector(".checkmark .checkmark__check").classList.add('checked')
      document.querySelector(".checkbox").style.visibility = "hidden"
      document.querySelector(".errorMsg").style.visibility = "visible"
   }
})

function checkInputs() {
   let countFalse = 0
   let emailRegexp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
   let telRegexp = /^[0-9]{2}.[0-9]{2}.[0-9]{2}.[0-9]{2}.[0-9]{2}$/
   if (nameForm.value.length < 2) {
      nameForm.style.border = "1px solid red"
      countFalse++
   }
   else {
      nameForm.style.border = "1px solid white"
   }
   if (prenomForm.value.length < 2){
      prenomForm.style.border = "1px solid red"
      countFalse++
   }
   else {
      prenomForm.style.border = "1px solid white"
   }
   if (!emailRegexp.test(mailForm.value)){
      mailForm.style.border = "1px solid red"
      countFalse++
   }
   else {
      mailForm.style.border = "1px solid white"
   }
   if (msgMail.value.length < 50){
      msgMail.style.border = "1px solid red"
      countFalse++
   }
   else {
      msgMail.style.border = "1px solid white"
   }
   if (!telRegexp.test(telForm.value)) {
      telForm.style.border = "1px solid red"
      countFalse++
   }
   else {
      telForm.style.border = "1px solid white"
   }
   if (objetMail.value == "--Choix de l'Objet--") {
      objetMail.style.border = "1px solid red"
      countFalse++
   }
   else {
      objetMail.style.border = "1px solid white"
   }
   if (countFalse > 0) {
      return false
   }
   else {
      return true
   }
}