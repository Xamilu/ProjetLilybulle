let nameUser = document.querySelector('#login');
let keyword = document.querySelector('#password');

async function checkAccountAdmin (){
    let isUsernameCorrect = await checkUsername() 
    let isPasswordCorrect = await checkPassword()
    nameUser.style.borderBottom = null
    keyword.style.borderBottom = null
    if (!isUsernameCorrect) {
        errorMsg(nameUser)
    }else if (!isPasswordCorrect) {
        errorMsg(keyword)
    }
    if (isUsernameCorrect && isPasswordCorrect) {
         window.location.href = './panelAdmin.html'
    }
}

async function checkUsername(){
    let accountList = await getAccounts()
    for (let i = 0; i < accountList.length; i++) {
        if (accountList[i].nameUser == nameUser.value) {
            return true
        }
    }
    return false
}

async function checkPassword(){
    let accountList = await getAccounts()
    for (let i = 0; i < accountList.length; i++) {
        if (accountList[i].nameUser == nameUser.value) {            
            if (accountList[i].keyword == keyword.value) {
                return true
            } else {
                break
            }
        }
    }
    return false
}

async function createAccount() {
    await fetch('/db/createAdminAccount', {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            nameUser: nameUser.value,
            keyword: keyword.value,
        })
        }).then(console.log('Ajout réaliser'))
}

async function getAccounts(){
    let accountsList
    await fetch('/db/getAdminAccount')
        .then(response=> response.json())
        .then(accounts => accountsList = accounts);
    return accountsList
}

async function errorMsg(element) {
    element.style.borderBottom = "2px solid #be1d1d"
}
