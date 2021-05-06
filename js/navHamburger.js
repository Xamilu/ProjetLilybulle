var btn = document.querySelector('#btn-resp');
var menu = document.querySelector('.full-screen');
var span = document.getElementsByClassName("close")[0]
let styleMenu = getComputedStyle(menu)
let links = document.querySelector('.full-screen ul')

span.onclick = function(){
    links.style.opacity = "0"
    links.style.left = "-15%"
    span.style.opacity = "0"
    setTimeout( () => {
        menu.style.animation = "bgBurgerOpenReverse 0.6s ease-in-out forwards"
        setTimeout(() => {
            menu.style.display = "none"
            menu.style.animation = "bgBurgerOpen 0.6s ease-in-out forwards"
            setTimeout(() => {
                links.style.opacity = "1"
                links.style.left = "27%"
                span.style.opacity = "1"
            }, 300);
        }, 600);
    },500)
}

function DisplayMenu(){
    if(styleMenu.display == "none") {
        menu.style.display = "block"
    }
    else{
        menu.style.display = "none";
    } 
}