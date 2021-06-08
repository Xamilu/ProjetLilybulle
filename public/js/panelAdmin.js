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
		try{
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
		}catch{} 
	}
	for (let j = 0; j < imageList.length; j++) {
		const imageJ = imageList[j];
		const metadataJ = imageJ.metadata
		try{
			if (imageList[j-1] == undefined) {
			document.querySelector(`#${metadataJ.tags.categorie} #${metadataJ.tags.sousCategorie} form`).insertAdjacentHTML('afterbegin' , `
			<input type="file" name="image" id="image${metadataJ.tags.sousCategorie}${metadataJ.tags.position}" data-id="${imageJ._id}" class="inputfile"/>
			<label for="image${metadataJ.tags.sousCategorie}${metadataJ.tags.position}"> Image ${metadataJ.tags.position} </label>`)
			} else {
				document.querySelector(`#${metadataJ.tags.categorie} #${metadataJ.tags.sousCategorie} form`).insertAdjacentHTML('afterbegin' , `
				<input type="file" name="image" id="image${metadataJ.tags.sousCategorie}${metadataJ.tags.position}" data-id="${imageJ._id}" class="inputfile"/>
				<label for="image${metadataJ.tags.sousCategorie}${metadataJ.tags.position}"> Image ${metadataJ.tags.position} </label>`)
			}
		} catch{}
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
		}
	}
	displayNotifAdd()
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

let inputImage = document.querySelector('#file')
inputImage.addEventListener('change', updateImageDisplay);

function updateImageDisplay() {
	let para = document.querySelector('#titreActu')
    var curFiles = inputImage.files;    
    let nameFile ;
    if(curFiles.length == 0) {
      para.innerHTML = 'Pas de son importé';
    } else {
        if (curFiles[0].name.length > 15) {
            nameFile = curFiles[0].name.slice(0,15) 
        }
        else{
            nameFile = curFiles[0].name
        }
        para.value = nameFile ;
    }
}

// recupération articles
async function checkArticle(){
	event.preventDefault();
	if (numeroActu.value == 0 && !imageInput.value && !titre.value && !contenu.innerHTML) {
		numeroActu.style.border = "2px solid #D93A3A"
		imageInput.style.border = "2px solid #D93A3A"
		titre.style.border = "2px solid #D93A3A"
		divContenu.style.border = "2px solid #D93A3A"
		errorMsg("Veuillez remplir les champs ci-dessus.")
	} else if (numeroActu.value == 0) {
		numeroActu.style.border = "2px solid #D93A3A"
		imageInput.style.border = "none"
		titre.style.border = "none"
		divContenu.style.border = "none"
		errorMsg("Veuillez sélectionner un numéro d'articles.")
	} else if (!imageInput.value) {
		numeroActu.style.border = "none"
		imageInput.style.border = "2px solid #D93A3A"
		titre.style.border = "none"
		divContenu.style.border = "none"
		errorMsg("Choisissez une image.")
	} else if (!titre.value) {
		titre.style.border = "2px solid #D93A3A"
		numeroActu.style.border = "none"
		imageInput.style.border = "none"
		divContenu.style.border = "none"
		errorMsg("Choisissez un titre.")
	}  else if (!contenu.innerHTML) {
		divContenu.style.border = "2px solid #D93A3A"
		errorMsg("Rédigez votre article.")
	}  else {
		erreurMsgElement.style.opacity = '0'
		let popup = document.querySelectorAll('.confirmeSuppression')[0]
		let positionValue = document.querySelector('#actu-select').value;
		let position = positionValue[positionValue.length-1];
		popup.insertAdjacentHTML('afterend', `
		<div class="confirmeChangement">
			<h5>Remplacer l'Article${position} ?</h5>
			<div>
				<button onclick="sendArticle()" class="confirm">Oui</button>
				<button onclick="toggleChange()" class="confirm">Non</button>
			</div>
		</div>
		`)
	toggleChange()
	}
}

  async function sendArticle(){
	let titre = document.querySelector('#titreContent').value;
	let contenu = document.querySelector('[contenteditable]').innerHTML;
	let positionValue = document.querySelector('#actu-select').value;
	let imageInput = document.querySelector('#file')
	let position = positionValue[positionValue.length-1];
	let imagesList = await getAllImages()
	let articlesList = await getArticles()
	for (let i = 0; i < articlesList.length; i++) {
		let imageId;
		const article = articlesList[i];
		for (let j = 0; j < imagesList.length; j++) {
			const image = imagesList[j];
			if(image.metadata.tags.categorie == 'article' && image.metadata.tags.position == position){
				imageId = image._id
			}
		}
		if(article.position == position){
			deleteArticles(article._id, imageId)
			break
		}
	}
	let params = {
		nameFile: `Article${parseInt(position)}`,
		tags: {
			categorie: 'article',
			sousCategorie: " ",
			position: parseInt(position)
		}
	}
	const formData = new FormData()
	formData.append("params", JSON.stringify(params))
	formData.append("inputList[i]", imageInput.files[0])
	await fetch(`/db/addImage`, {
		method: 'POST',
		body: formData
	})
	let param = {
		position: position, 
		titre: titre,
		contenu: contenu
	}
	
	await fetch('/db/createArticle', {
      method: 'POST',
      body: JSON.stringify(param)
    }).then()

	toggleChange()
	toggleOk()
  }

  async function getArticles(){
    let articlesList
    await fetch('/db/getArticle')
    .then(response=> response.json())
    .then(articles => articlesList = articles)
	return articlesList
  }

displayArticlesHistorique()

async function displayArticlesHistorique() {
	let imagesList = await getAllImages()
	let articlesList = await getArticles();
	let articleContainers = document.querySelectorAll('.articleHistorique');
  	for (let i = 0; i < articlesList.length; i++) {
		let imageId
		let position = parseInt(articlesList[i].position);
		for (let j = 0; j < imagesList.length; j++) {
			const image = imagesList[j];
			if(image.metadata.tags.categorie == 'article' && image.metadata.tags.position == position){
				imageId = image._id
			}
		}
		articleContainers[position-1].insertAdjacentHTML('beforeend',
		`<div id="blur">
		<h4 id="position">Actualité : ${articlesList[i].position}</h4>
		<h4 id="art${articlesList[i].position}"><u>Titre</u> : ${articlesList[i].titre}</h4>
		<p id="contenu${articlesList[i].position}">${articlesList[i].contenu}</p>
		</div>
		<span class="iconify" onclick="toggle('${articlesList[i]._id}', '${imageId}')" data-icon="ri:delete-bin-6-line" data-inline="false" style="color: black;" data-width="5%"></span>
		`)	
	}
}

function toggle(articleId, imageId) {
	let popup = document.querySelectorAll('.confirmeSuppression')[0];
	popup.classList.toggle('active');
	let yesButton = document.querySelectorAll(".confirm")[0];
	yesButton.setAttribute('onclick' , `deleteArticles('${articleId}', '${imageId}')`)
}

function toggleChange() {
	let popup = document.querySelectorAll('.confirmeChangement')[0];
	popup.classList.toggle('active');
}

function toggleOk(){
	let popup = document.querySelector('.confirmeFinis');
	popup.classList.toggle('active');
	errorMsg("Votre article à bien été publié !")
	erreurMessage.style.opacity = '1';
	erreurMessage.style.color = '#5FC04C';
}

async function deleteArticles(articleId, imageId) {
	await fetch('/db/deleteArticle', {
		method : 'POST',
		body : articleId
	})
	await deleteImage(imageId)
	toggle()
	displayNotifAdd()
	setTimeout(() => {
		window.location.reload()
	}, 4000);
}

let numeroActu = document.querySelector('#actu-select');
let titre = document.querySelector('#titreContent');
let contenu = document.querySelector('[contenteditable]');
let divContenu = document.querySelector('#editeur');
let imageInput = document.querySelector('#file');
let erreurMsgElement = document.querySelector('#confirmActu #msg');
let erreurMessage = document.querySelector('#confirmActu #msg p');

function errorMsg(msg) {
	erreurMessage.innerHTML = msg;
	erreurMsgElement.style.visibility = 'visible';
	erreurMsgElement.style.opacity = '1';
	erreurMsgElement.style.color = '#D93A3A';
	erreurMsgElement.style.fontSize = '1.2em';
}

// Display notification when adding image
function displayNotifAdd(){
	let notif = document.querySelector('.notifs')
    // Display a message when you add aan image
    notif.insertAdjacentHTML('afterbegin', `
		<div class="alert" style="background-color: rgb(24, 156, 243);">
			<span class="alertaddcart"></span>
			Les modifications ont bien été réalisés.
		</div>
	`)
    document.querySelector('.alert').classList.add('hide')
}
