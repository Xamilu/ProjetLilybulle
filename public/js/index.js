// Appartition par le bas des textes sur la page 
let item = document.querySelector("#paragraphe");
let imgPres = document.querySelector("#presentation .img");

function isElementInViewport(el) {
  let rect = el.getBoundingClientRect();
  return (
    rect.top >= 50 &&
    rect.left >=0 &&
    rect.bottom <= (window.innerHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function callbackFunc() {
    if (isElementInViewport(item)) {
      if(!item.classList.contains("in-view")){
        item.classList.add("in-view");
        imgPres.classList.add("in-view");
      }
    } 
    else if(item.classList.contains("in-view")) {
        item.classList.remove("in-view");
        imgPres.classList.remove("in-view");
    }
}

window.addEventListener("load", callbackFunc);
window.addEventListener("scroll", callbackFunc);

async function getArticles(){
  let articlesList
  await fetch('/db/getArticle')
  .then(response=> response.json())
  .then(articles => articlesList = articles)

  console.log(articlesList)
  return articlesList
}

displayArticles()

async function displayArticles() {
	let articlesList = await getArticles();
	let articleContainers = document.querySelectorAll('.carousel-item');
  for (let i = 0; i < articlesList.length; i++) {
		  let position = parseInt(articlesList[i].position);
      articleContainers[position-1].insertAdjacentHTML('afterbegin',
      `<h3 id="art${articlesList[i].position}">${articlesList[i].titre}</h3>
      <p id="contenu${articlesList[i].position}">${articlesList[i].contenu}</p>`)
		}
}
