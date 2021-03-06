let cartesMenu = document.querySelectorAll(".img-home");

function isElementInViewport(el) {
  let rect = el.getBoundingClientRect();
  return (
    rect.top >= -el.offsetHeight/1.25 &&
    rect.left >= -window.innerWidth &&
    rect.bottom <= window.innerHeight + el.offsetHeight/1.25 &&
    rect.right <= window.innerWidth*2 
  );
}

function callbackFunc() {
  for (let i = 0; i < cartesMenu.length; i++) {
    if (isElementInViewport(cartesMenu[i])) {
      if(!cartesMenu[i].classList.contains("in-view")){
        cartesMenu[i].classList.add("in-view");
      }
    }
    else if(cartesMenu[i].classList.contains("in-view")) {
      cartesMenu[i].classList.remove("in-view");
  }
  }
}
 
window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);