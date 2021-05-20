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

async function sendImageToDB(){
	// for (let i = 0; i < array.length; i++) {
	// 	const element = array[i];
		
	// }
	// let params = {
	// 	nameFile: ,
	// 	tags: {

	// 	}
	// }
	await fetch('/db/addImage', {
		method: 'POST',
		body: params
	})
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