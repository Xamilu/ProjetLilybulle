const url = window.location.search
const urlParams = new URLSearchParams(url)
const emailId = urlParams.get('id')

let options = {
    method: 'POST',
    body: emailId
}
window.onload = async () => {
    await fetch('/db/deleteEmail', options).then()
}
