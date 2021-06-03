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

displayAllMails()

displayAllContainer()

async function displayAllContainer(){
	let emplacementImageInputContainer = document.querySelectorAll('.emplacementImage')
	for (let i = 0; i < emplacementImageInputContainer.length; i++) {
		emplacementImageInputContainer[i].remove()
	}
	let imageList =	await getAllImages()
	document.querySelector('.wrapper').style.opacity= "0"
	setTimeout(() => {
		document.querySelector('.wrapper').style.visibility = "hidden"
		document.querySelector("#upload-image").style.opacity = "1"
	}, 500);
	for (let i = 0; i < imageList.length; i++) {
		const image = imageList[i];
		const metadata = image.metadata
		if (imageList[i-1] == undefined) {
			if (!document.querySelector(`#${metadata.tags.sousCategorie}`)) {
				document.querySelector(`#${metadata.tags.categorie}`).insertAdjacentHTML('beforeend', `
				<div class="emplacementImage" id="${metadata.tags.sousCategorie}">
					<p>Page ${metadata.tags.sousCategorie} :</p>
					<form class="formUpload" enctype="multipart/form-data">
						<input type="button" onclick="changeImageInDB('${metadata.tags.categorie}','${metadata.tags.sousCategorie}')" value="Envoyer" class="submitImage">
					</form>
				</div>
				`)
			}
		} else if (metadata.tags.sousCategorie != imageList[i-1].metadata.tags.sousCategorie){
			if (!document.querySelector(`#${metadata.tags.sousCategorie}`)) {
				document.querySelector(`#${metadata.tags.categorie}`).insertAdjacentHTML('beforeend', `
				<div class="emplacementImage" id="${metadata.tags.sousCategorie}">
					<p>Page ${metadata.tags.sousCategorie} :</p>
					<form class="formUpload" enctype="multipart/form-data">
						<input type="button" onclick="changeImageInDB('${metadata.tags.categorie}','${metadata.tags.sousCategorie}')" value="Envoyer" class="submitImage">
					</form>
				</div>
				`)
			}
		}
	}
	for (let j = 0; j < imageList.length; j++) {
		const imageJ = imageList[j];
		const metadataJ = imageJ.metadata
		if (imageList[j-1] == undefined) {
			document.querySelector(`#${metadataJ.tags.categorie} #${metadataJ.tags.sousCategorie} form`).insertAdjacentHTML('afterbegin' , `
			<input type="file" name="image" id="image${metadataJ.tags.sousCategorie}${metadataJ.tags.position}" data-id="${imageJ._id}" class="inputfile"/>
			<label for="image${metadataJ.tags.sousCategorie}${metadataJ.tags.position}"> Image ${metadataJ.tags.position} </label>`)
		} else {
			document.querySelector(`#${metadataJ.tags.categorie} #${metadataJ.tags.sousCategorie} form`).insertAdjacentHTML('afterbegin' , `
			<input type="file" name="image" id="image${metadataJ.tags.sousCategorie}${metadataJ.tags.position}" data-id="${imageJ._id}" class="inputfile"/>
			<label for="image${metadataJ.tags.sousCategorie}${metadataJ.tags.position}"> Image ${metadataJ.tags.position} </label>`)
		}
	}
}

async function changeImageInDB(categorie, sousCategorie){
	let inputList = document.querySelectorAll(`#${categorie} #${sousCategorie} input`)
	let labelList = document.querySelectorAll(`#${categorie} #${sousCategorie} label`)
	for (let i = 0; i < inputList.length-1; i++) {
		let label = labelList[i].innerHTML
		if (inputList[i].value != "") {
			let params = {
				nameFile: labelList[i].innerHTML.replace(/\s/g, ""),
				tags: {
					categorie: categorie,
					sousCategorie: sousCategorie,
					position: parseInt(label[label.length-2])
				}
			}
			await deleteImage(inputList[i].dataset.id)
			const formData = new FormData()
			formData.append("params", JSON.stringify(params))
			formData.append("inputList[i]", inputList[i].files[0])
			await fetch(`/db/addImage`, {
				method: 'POST',
				body: formData
			})
			inputList[i].value = ""
		}
	}
	displayAllContainer()
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

async function getAllImages(){
	let images 
	await fetch(`/db/getImages`)
		.then((response) => response.json())
		.then((data) => images = data)
	return images
}	

async function deleteImage(id){
	let params = {
		id: id,
	}
	await fetch("/db/deleteImage", {
		method: 'DELETE',
		body: JSON.stringify(params)
	}).then()
}



// recupération articles
async function sendArticle(){
	event.preventDefault();

	let titre = document.querySelector('#titreContent').value;
	let contenu = document.querySelector('[contenteditable]').textContent;
	let positionValue = document.querySelector('#actu-select').value;
	let position = positionValue[positionValue.length-1];
	console.log(position);

	let param = {
		position: position, 
		titre:titre,
		contenu: contenu
	}

	console.log(titre)
	console.log(contenu)
    await fetch('/db/createArticle', {
      method: 'POST',
      body: JSON.stringify(param)
    }).then()
  }

  async function getArticles(){
    let articlesList
    await fetch('/db/getArticle')
    .then(response=> response.json())
    .then(articles => articlesList = articles)

	console.log(articlesList)
    return articlesList
  }

  getArticles();