var btn = document.querySelector('#btn-resp');
var menu = document.querySelector('.full-screen');
var span = document.getElementsByClassName("close")[0]

span.onclick = function(){
    menu.classList.remove("full-screenResp"); 
    menu.classList.add("full-screen")
}

function DisplayMenu(){
    if(menu.classList.contains("full-screen")) {
        menu.classList.remove("full-screen")
        menu.classList.add("full-screenResp") 
    }
    else{
       menu.classList.remove("full-screenResp"); 
       menu.classList.add("full-screen")
    } 
}