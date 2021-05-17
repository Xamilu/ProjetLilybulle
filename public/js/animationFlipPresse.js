let items = document.querySelectorAll(".imgPresse");
let articlePresse = document.querySelector("#articlePresse")

function isElementInViewport(el) {
  let rect = el.getBoundingClientRect();
  return (
    rect.top >= -articlePresse.offsetHeight/1.5 &&
    rect.left >= -0 &&
    rect.bottom <= window.innerHeight + articlePresse.offsetHeight/2 &&
    rect.right <= window.innerWidth
  );
}

function callbackFunc() {
    if (isElementInViewport(articlePresse)) {
        items[0].classList.add("flip");
        setTimeout(() => {
            items[1].classList.add("flip");
            setTimeout(() => {
                items[2].classList.add("flip");
                setTimeout(() => {
                    items[3].classList.add("flip");
                }, 300);
            }, 300);
        }, 300);
    }
    else if(!isElementInViewport(articlePresse)){
        items[0].classList.remove("flip");
        setTimeout(() => {
            items[1].classList.remove("flip");
            setTimeout(() => {
                items[2].classList.remove("flip");
                setTimeout(() => {
                    items[3].classList.remove("flip");
                }, 300);
            }, 300);
        }, 300);
    }   
}
 
window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);