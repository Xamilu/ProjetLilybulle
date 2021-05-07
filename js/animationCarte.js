let items = document.querySelectorAll(".categorieCarteDuo a");
let item = document.querySelector(".categorieCarteSolo a");

function isElementInViewport(el) {
  let rect = el.getBoundingClientRect();
  return (
    rect.top >= -items[1].offsetHeight/1.5 &&
    rect.left >= -(window.innerWidth || document.documentElement.clientWidth) &&
    rect.bottom <= (window.innerHeight + items[1].offsetHeight/1.5) &&
    rect.right <= (window.innerWidth+100 || document.documentElement.clientWidth+100)
  );
}

function callbackFunc() {
  for (let i = 0; i < items.length; i++) {
    if (isElementInViewport(items[i])) {
      if(!items[i].classList.contains("in-view")){
        items[i].classList.add("in-view");
      }
    } 
    else if(items[i].classList.contains("in-view")) {
        items[i].classList.remove("in-view");
    }
  }
  try{
     if (isElementInViewport(item)) {
      if(!item.classList.contains("in-view")){
        item.classList.add("in-view");
      }
    } 
    else if(item.classList.contains("in-view")) {
        item.classList.remove("in-view");
    }
  }catch (e) {
  }
}
 
window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);