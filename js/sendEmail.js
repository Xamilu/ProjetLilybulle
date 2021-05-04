const nameForm = document.querySelector("#nom")
const prenomForm = document.querySelector("#prenom")
const mailForm = document.querySelector("#mail")
const telForm = document.querySelector("#tel")
const objetMail = document.querySelector("#motif-select")
const msgMail = document.querySelector("#msg")

document.querySelector('#submit').addEventListener('click', (event) => {
   // Set the IDs
    // 🚫 INSECURE 🚫 //
    const SERVICE_ID = 'service_4s4qmmf'
    const TEMPLATE_ID = 'template_v42qoim'
    const USER_ID = 'user_lmDYGxw2cx0QPO420I7IY'


   let params = {
      nameSend: nameForm.value.toUpperCase(),
      firstName: prenomForm.value,
      notes: msgMail.value,
      objectMail: objetMail.value,
      tel: telForm.value,
      mel: mailForm.value
   };

   /* emailjs.send(SERVICE_ID, TEMPLATE_ID, params, USER_ID)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    }) */
})
;