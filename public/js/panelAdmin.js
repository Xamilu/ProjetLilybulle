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
let boutiqueContainer = document.querySelector('#boutique')
let atelierContainer = document.querySelector('#atelier')
let agenceContainer = document.querySelector('#agence')
let caravaneContainer = document.querySelector('#caravane')

displayAllMails()

displayAllContainer()

async function displayAllContainer(){
	let boutiqueImageList =	await getAllImages("boutique")
	let atelierImageList =	await getAllImages("atelier")
	let agenceImageList =	await getAllImages("agence")
	let caravaneImageList =	await getAllImages("caravane")
	document.querySelector('.wrapper').style.opacity= "0"
	setTimeout(() => {
		document.querySelector('.wrapper').style.visibility = "hidden"
		document.querySelector("#upload-image").style.opacity = "1"
	}, 500);
	
	for (let i = 0; i < boutiqueImageList.length; i++) {
		const boutiqueImage = boutiqueImageList[i];
		if (boutiqueImageList[i-1] == undefined) {
			boutiqueContainer.insertAdjacentHTML('beforeend', `
			<div class="emplacementImage" id="${boutiqueImage.tags.sousCategorie}">
			<p>Page ${boutiqueImage.tags.sousCategorie} :</p>
			<form class="formUpload" enctype="multipart/form-data">
				<input type="file" name="image" id="image${boutiqueImage.tags.sousCategorie}1" class="inputfile"/>
				<label for="image${boutiqueImage.tags.sousCategorie}1"> Image 1 </label>
				<input type="file" name="image" id="image${boutiqueImage.tags.sousCategorie}2" class="inputfile"/>
				<label for="image${boutiqueImage.tags.sousCategorie}2"> Image 2 </label>
				<input type="file" name="image" id="image${boutiqueImage.tags.sousCategorie}3" class="inputfile"/>
				<label for="image${boutiqueImage.tags.sousCategorie}3"> Image 3 </label>
				<input type="file" name="image" id="image${boutiqueImage.tags.sousCategorie}4" class="inputfile"/>
				<label for="image${boutiqueImage.tags.sousCategorie}4"> Image 4 </label>
				<input type="button" onclick="changeImageInDB('boutique','${boutiqueImage.tags.sousCategorie}')" value="Envoyer" class="submitImage">
			</form>
		</div>
			`)
		} else if (boutiqueImage.tags.sousCategorie != boutiqueImageList[i-1].tags.sousCategorie){
			boutiqueContainer.insertAdjacentHTML('beforeend', `
			<div class="emplacementImage" id="${boutiqueImage.tags.sousCategorie}">
			<p>Page ${boutiqueImage.tags.sousCategorie} :</p>
			<form class="formUpload" enctype="multipart/form-data">
				<input type="file" name="image" id="image${boutiqueImage.tags.sousCategorie}1" class="inputfile"/>
				<label for="image${boutiqueImage.tags.sousCategorie}1"> Image 1 </label>
				<input type="file" name="image" id="image${boutiqueImage.tags.sousCategorie}2" class="inputfile"/>
				<label for="image${boutiqueImage.tags.sousCategorie}2"> Image 2 </label>
				<input type="file" name="image" id="image${boutiqueImage.tags.sousCategorie}3" class="inputfile"/>
				<label for="image${boutiqueImage.tags.sousCategorie}3"> Image 3 </label>
				<input type="file" name="image" id="image${boutiqueImage.tags.sousCategorie}4" class="inputfile"/>
				<label for="image${boutiqueImage.tags.sousCategorie}4"> Image 4 </label>
				<input type="button" onclick="changeImageInDB('boutique','${boutiqueImage.tags.sousCategorie}')" value="Envoyer" class="submitImage">
			</form>
		</div>
			`)
		}
	}
	for (let i = 0; i < atelierImageList.length; i++) {
		const atelierImage = atelierImageList[i];
		if (atelierImageList[i-1] == undefined) {
			atelierContainer.insertAdjacentHTML('beforeend', `
			<div class="emplacementImage" id="${atelierImage.tags.sousCategorie}">
			<p>Page ${atelierImage.tags.sousCategorie} :</p>
			<form class="formUpload" enctype="multipart/form-data">
				<input type="file" name="image" id="image${atelierImage.tags.sousCategorie}1" class="inputfile"/>
				<label for="image${atelierImage.tags.sousCategorie}1"> Image 1 </label>
				<input type="file" name="image" id="image${atelierImage.tags.sousCategorie}2" class="inputfile"/>
				<label for="image${atelierImage.tags.sousCategorie}2"> Image 2 </label>
				<input type="file" name="image" id="image${atelierImage.tags.sousCategorie}3" class="inputfile"/>
				<label for="image${atelierImage.tags.sousCategorie}3"> Image 3 </label>
				<input type="file" name="image" id="image${atelierImage.tags.sousCategorie}4" class="inputfile"/>
				<label for="image${atelierImage.tags.sousCategorie}4"> Image 4 </label>
				<input type="button" onclick="changeImageInDB('atelier','${atelierImage.tags.sousCategorie}')" value="Envoyer" class="submitImage">
			</form>
		</div>
			`)
		} else if (atelierImage.tags.sousCategorie != atelierImageList[i-1].tags.sousCategorie){
			atelierContainer.insertAdjacentHTML('beforeend', `
			<div class="emplacementImage" id="${atelierImage.tags.sousCategorie}">
			<p>Page ${atelierImage.tags.sousCategorie} :</p>
			<form class="formUpload" enctype="multipart/form-data">
				<input type="file" name="image" id="image${atelierImage.tags.sousCategorie}1" class="inputfile"/>
				<label for="image${atelierImage.tags.sousCategorie}1"> Image 1 </label>
				<input type="file" name="image" id="image${atelierImage.tags.sousCategorie}2" class="inputfile"/>
				<label for="image${atelierImage.tags.sousCategorie}2"> Image 2 </label>
				<input type="file" name="image" id="image${atelierImage.tags.sousCategorie}3" class="inputfile"/>
				<label for="image${atelierImage.tags.sousCategorie}3"> Image 3 </label>
				<input type="file" name="image" id="image${atelierImage.tags.sousCategorie}4" class="inputfile"/>
				<label for="image${atelierImage.tags.sousCategorie}4"> Image 4 </label>
				<input type="button" onclick="changeImageInDB('atelier','${atelierImage.tags.sousCategorie}')" value="Envoyer" class="submitImage">
			</form>
		</div>
			`)
		}
	}
	for (let i = 0; i < agenceImageList.length; i++) {
		const agenceImage = agenceImageList[i];
		if (agenceImageList[i-1] == undefined) {
			agenceContainer.insertAdjacentHTML('beforeend', `
			<div class="emplacementImage" id="${agenceImage.tags.sousCategorie}">
			<p>Page ${agenceImage.tags.sousCategorie} :</p>
			<form class="formUpload" enctype="multipart/form-data">
				<input type="file" name="image" id="image${agenceImage.tags.sousCategorie}1" class="inputfile"/>
				<label for="image${agenceImage.tags.sousCategorie}1"> Image 1 </label>
				<input type="file" name="image" id="image${agenceImage.tags.sousCategorie}2" class="inputfile"/>
				<label for="image${agenceImage.tags.sousCategorie}2"> Image 2 </label>
				<input type="file" name="image" id="image${agenceImage.tags.sousCategorie}3" class="inputfile"/>
				<label for="image${agenceImage.tags.sousCategorie}3"> Image 3 </label>
				<input type="file" name="image" id="image${agenceImage.tags.sousCategorie}4" class="inputfile"/>
				<label for="image${agenceImage.tags.sousCategorie}4"> Image 4 </label>
				<input type="button" onclick="changeImageInDB('agence','${agenceImage.tags.sousCategorie}')" value="Envoyer" class="submitImage">
			</form>
		</div>
			`)
		} else if (agenceImage.tags.sousCategorie != agenceImageList[i-1].tags.sousCategorie){
			agenceContainer.insertAdjacentHTML('beforeend', `
			<div class="emplacementImage" id="${agenceImage.tags.sousCategorie}">
			<p>Page ${agenceImage.tags.sousCategorie} :</p>
			<form class="formUpload" enctype="multipart/form-data">
				<input type="file" name="image" id="image${agenceImage.tags.sousCategorie}1" class="inputfile"/>
				<label for="image${agenceImage.tags.sousCategorie}1"> Image 1 </label>
				<input type="file" name="image" id="image${agenceImage.tags.sousCategorie}2" class="inputfile"/>
				<label for="image${agenceImage.tags.sousCategorie}2"> Image 2 </label>
				<input type="file" name="image" id="image${agenceImage.tags.sousCategorie}3" class="inputfile"/>
				<label for="image${agenceImage.tags.sousCategorie}3"> Image 3 </label>
				<input type="file" name="image" id="image${agenceImage.tags.sousCategorie}4" class="inputfile"/>
				<label for="image${agenceImage.tags.sousCategorie}4"> Image 4 </label>
				<input type="button" onclick="changeImageInDB('agence','${agenceImage.tags.sousCategorie}')" value="Envoyer" class="submitImage">
			</form>
		</div>
			`)
		}
	}
	for (let i = 0; i < caravaneImageList.length; i++) {
		const caravaneImage = caravaneImageList[i];
		if (caravaneImageList[i-1] == undefined) {
			caravaneContainer.insertAdjacentHTML('beforeend', `
			<div class="emplacementImage" id="${caravaneImage.tags.sousCategorie}">
			<p>Page ${caravaneImage.tags.sousCategorie} :</p>
			<form class="formUpload" enctype="multipart/form-data">
				<input type="file" name="image" id="image${caravaneImage.tags.sousCategorie}1" class="inputfile"/>
				<label for="image${caravaneImage.tags.sousCategorie}1"> Image 1 </label>
				<input type="file" name="image" id="image${caravaneImage.tags.sousCategorie}2" class="inputfile"/>
				<label for="image${caravaneImage.tags.sousCategorie}2"> Image 2 </label>
				<input type="file" name="image" id="image${caravaneImage.tags.sousCategorie}3" class="inputfile"/>
				<label for="image${caravaneImage.tags.sousCategorie}3"> Image 3 </label>
				<input type="file" name="image" id="image${caravaneImage.tags.sousCategorie}4" class="inputfile"/>
				<label for="image${caravaneImage.tags.sousCategorie}4"> Image 4 </label>
				<input type="button" onclick="changeImageInDB('caravane','${caravaneImage.tags.sousCategorie}')" value="Envoyer" class="submitImage">
			</form>
		</div>
			`)
		} else if (caravaneImage.tags.sousCategorie != caravaneImageList[i-1].tags.sousCategorie){
			caravaneContainer.insertAdjacentHTML('beforeend', `
			<div class="emplacementImage" id="${caravaneImage.tags.sousCategorie}">
			<p>Page ${caravaneImage.tags.sousCategorie} :</p>
			<form class="formUpload" enctype="multipart/form-data">
				<input type="file" name="image" id="image${caravaneImage.tags.sousCategorie}1" class="inputfile"/>
				<label for="image${caravaneImage.tags.sousCategorie}1"> Image 1 </label>
				<input type="file" name="image" id="image${caravaneImage.tags.sousCategorie}2" class="inputfile"/>
				<label for="image${caravaneImage.tags.sousCategorie}2"> Image 2 </label>
				<input type="file" name="image" id="image${caravaneImage.tags.sousCategorie}3" class="inputfile"/>
				<label for="image${caravaneImage.tags.sousCategorie}3"> Image 3 </label>
				<input type="file" name="image" id="image${caravaneImage.tags.sousCategorie}4" class="inputfile"/>
				<label for="image${caravaneImage.tags.sousCategorie}4"> Image 4 </label>
				<input type="button" onclick="changeImageInDB('caravane','${caravaneImage.tags.sousCategorie}')" value="Envoyer" class="submitImage">
			</form>
		</div>
			`)
		}
	}
}

async function changeImageInDB(categorie, sousCategorie){
	let inputList = document.querySelectorAll(`#${categorie} #${sousCategorie} input`)
	let labelList = document.querySelectorAll(`#${categorie} #${sousCategorie} label`)
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
			await deleteImage(categorie, sousCategorie, i+1)
			const formData = new FormData()
			formData.append("params", JSON.stringify(params))
			formData.append("inputList[i]", inputList[i].files[0])
			await fetch(`/db/add${categorie}Image`, {
				method: 'POST',
				body: formData
			})
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

async function getAllImages(categorie){
	let images 
	await fetch(`/db/get${categorie}Images`)
		.then((response) => response.json())
		.then((data) => images = data)
	return images
}	

async function deleteImage(categorie, sousCategorie, position){
	let params = {
		sousCategorie: sousCategorie,
		position: position,
	}
	await fetch(`/db/delete${categorie}Image`, {
		method: 'POST',
		body: JSON.stringify(params)
	}).then()
}