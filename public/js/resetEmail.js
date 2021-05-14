const url = window.location.search
const urlParams = new URLSearchParams(url)
const emailId = urlParams.get('id')

const emailContainer = document.querySelector("#email") 

emailContainer.innerHTML = emailId
let options = {
    method: 'POST',
    body: emailId
}
fetch('/db/deleteEmail', options).then()