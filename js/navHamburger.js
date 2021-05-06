var btn = document.getElementById('btn-resp');
var menu = document.getElementsByClassName('full-screen');

function DisplayMenu(){
    console.log('hello')
    if(menu.classList.contains("full-screen")) {
        console.log('hello')
        menu.classList.remove("full-screen")
}
    else menu.classList.add("full-screenResp");
};

btn.addEventListener("click",DisplayMenu())