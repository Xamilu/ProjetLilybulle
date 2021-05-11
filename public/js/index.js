// Appartition par le bas des textes sur la page 
let item = document.querySelector("#paragraphe");
let imgPres = document.querySelector("#presentation .img")
let email = document.querySelector('#newsLetterEmail');


function isElementInViewport(el) {
  let rect = el.getBoundingClientRect();
  return (
    rect.top >= 50 &&
    rect.left >=0 &&
    rect.bottom <= (window.innerHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function callbackFunc() {
    if (isElementInViewport(item)) {
      if(!item.classList.contains("in-view")){
        item.classList.add("in-view");
        imgPres.classList.add("in-view");
      }
    } 
    else if(item.classList.contains("in-view")) {
        item.classList.remove("in-view");
        imgPres.classList.remove("in-view");
    }
}

async function sendEmail(){
  await fetch('/db/createEmail', {
    method: 'POST',
    body: email.value,
  }).then()

  getEmails()
}

async function getEmails(){
  let emails1
  await fetch('/db/getEmails')
  .then(response=> response.json())
  .then(emails => emails1 = emails)

  console.log(emails1);
}


window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);