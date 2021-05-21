let LilybulleData = JSON.parse(sessionStorage.getItem('LilybulleData'))

if (sessionStorage.getItem('LilybulleData') == null) {
    sessionStorage.setItem('LilybulleData', "{}")
	window.location.href = './connexionAdmin.html'
}
if (sessionStorage.getItem('LilybulleData') == "{}") {
	window.location.href = './connexionAdmin.html'
}
try{
	if(LilybulleData.connected == false){
    window.location.href = './connexionAdmin.html'
	}
} catch {
	window.location.href = './connexionAdmin.html'
}

let listMailContainer = document.querySelector('#list-mail')
// var inputs = document.querySelectorAll( '.inputfile' );
// Array.prototype.forEach.call( inputs, function( input )
// {
// 	var label	 = input.nextElementSibling,
// 		labelVal = label.innerHTML;

// 	input.addEventListener( 'change', function( e )
// 	{
// 		var fileName = '';
// 		if( this.files && this.files.length > 1 )
// 			fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
// 		else
// 			fileName = e.target.value.split('/').pop();

// 		if( fileName )
// 			label.querySelector( 'span' ).innerHTML = fileName;
// 		else
// 			label.innerHTML = labelVal;
// 	});
// });

displayAllMails()

async function sendImageToDB(categorie, sousCategorie){
	let inputList = document.querySelectorAll(`#${categorie} #${sousCategorie} input`)
	let labelList = document.querySelectorAll(`#${categorie} #${sousCategorie} label`)
	let myForm = document.querySelector(`#${categorie} #${sousCategorie} form`)
	for (let i = 0; i < inputList.length-1; i++) {
		if (inputList[i].value != "") {	
			let params = {
				nameFile: labelList[i].innerHTML.replace(/\s/g, ""),
				tags: {
					categorie: categorie,
					sousCategorie: sousCategorie,
					position: i+1
				}
			}
			const formData = new FormData()
			formData.append("params", JSON.stringify(params))
			formData.append("inputList[i]", inputList[i].files[0])
			// await fetch('/db/addImage', {
			// 	method: 'POST',
			// 	body: formData
			// })
			inputList[i].value = ""
		}
	}
}

function deconnexionAdmin(){
	sessionStorage.setItem('LilybulleData', '{"connected" : false}')
	window.location.href = './connexionAdmin.html'
}

async function displayAllMails() {
	let mailsList = await getAllMails();
	for (let i = 0; i < mailsList.length; i++) {
		const mail = mailsList[i].email;
		listMailContainer.insertAdjacentHTML('afterbegin', `
		<p class="email">${mail}</p>
		`)
	}
}

async function getAllMails(){
	let mails
	await fetch('/db/getEmails')
		.then((response) => response.json())
		.then((data) => mails = data)
	return mails
}