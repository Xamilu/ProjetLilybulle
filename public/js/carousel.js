const carousel = document.querySelector('.carousel')
const slides = document.querySelectorAll('.carousel-item')
const dots = document.querySelectorAll('.dots-container a')
const nextSlideBtn = document.querySelector('.next-slide')
const prevSlideBtn = document.querySelector('.prev-slide')

// Each 9 seconds, go to the next slide
setInterval(() => {
    let index = getActiveSlide() + 1
 
    // If user are at the end of the carousel, return to the start
    if (index == slides.length) {
        index = 0

        slides[0].style.opacity = "1"
        for (let i = 1; i < slides.length; i++) {
            slides[i].style.opacity = "0"
        }
        try {
            updateActiveDot(0)
        }
        catch{}
    } else {
        slides[index].style.opacity = "1"
        slides[index - 1].style.opacity = "0"
        try {
            updateActiveDot(index)
        }
        catch{}
    }
}, 9000)

function getActiveSlide() {
    // Return the number of the slide on which the user is
    for (let i = 0; i < slides.length; i++) {
        let slide = slides[i];
        let style = getComputedStyle(slide);
        let opacite = style.opacity
        if (opacite == "1") {
            return i
        }
    }
}

function updateActiveDot(n) {
    // Remove the previous active dot
    for (let i = 0; i < dots.length; i++) {
        if (dots[i].classList.contains('active')) {
            dots[i].classList.remove('active')
            break
        }
    }
    // Set the new active dot
    dots[n].classList.add('active')
}

function goToSlide(n) {
    for (let i = 0; i < slides.length ; i++) {
        const slide = slides[i];
        if (i == n) {
            slide.style.opacity = "1"
        } else {
            slide.style.opacity = "0"
        }
    }
    updateActiveDot(n)
}

// Go to the next slide
function goToNextSlide() {
    const index = getActiveSlide()

    if (index < slides.length - 1) {
        slides[index + 1].style.opacity = "1"
        slides[index].style.opacity = "0"
        updateActiveDot(index+1)
    } else {
        slides[0].style.opacity = "1"
        for (let i = 1; i < slides.length; i++) {
            slides[i].style.opacity = "0"
        }
        updateActiveDot(0)
    }
}
    

// Go to the previous slide
function goToPrevSlide(){
    const index = getActiveSlide()

    // Check if the active slide is the last slide of the carousel
    if (index > 0) {
        slides[index - 1].style.opacity = "1"
        slides[index].style.opacity = "0"
        updateActiveDot(index-1)
    } else {
        slides[3].style.opacity = "1"
        for (let i = 2; i > -1; i--) {
            slides[i].style.opacity = "0"
        }
        updateActiveDot(slides.length-1)
    } 
}
    