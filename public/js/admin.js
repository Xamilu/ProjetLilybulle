let nameUser = document.querySelector('#login');
let keyword = document.querySelector('#password');

async function checkAccountAdmin (){
    console.log(nameUser.value);
    console.log(keyword.value);
    await fetch('/db/createAdminAccount', {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            nameUser: nameUser.value,
            keyword: keyword.value,
        })
        }).then()
    }