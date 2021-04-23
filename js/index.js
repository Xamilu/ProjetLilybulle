// Appartition par le bas des textes sur la page 
let item = document.querySelector("#paragraphe");


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
      }
    } 
    else if(item.classList.contains("in-view")) {
        item.classList.remove("in-view");
    }
}
 
window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);