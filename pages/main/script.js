// Burger menu
const navbar = document.getElementById("navbar")
const hamburgerMenu = document.getElementById("hamburger-menu")
const overlay = document.getElementById("overlay")
const navlinks = document.querySelectorAll(".nav-link");

navlinks.forEach(link => {
    link.addEventListener('click', closeNavbar)
})

function openNavbar() {
 navbar.classList.toggle("open");
 hamburgerMenu.classList.toggle("open");
 overlay.classList.toggle("open");
 document.body.classList.toggle("lock");
}

function closeNavbar() {
navbar.classList.remove("open");
hamburgerMenu.classList.remove("open");
overlay.classList.remove("open")
document.body.classList.toggle("lock");
}

hamburgerMenu.addEventListener('click', openNavbar)
overlay.addEventListener('click', closeNavbar);

//Infinite carousel slider on the Main page (in Our Friends)
const slideBtnLeft = document.querySelector(".pets__slide-button.prev");
const slideBtnRight = document.querySelector(".pets__slide-button.next")
const sliderTrack = document.querySelector(".pets__track")
slideBtnLeft.addEventListener('click', generatePrevSlides)
slideBtnRight.addEventListener('click', generateNextSlides)

let mainPetsCards = [];
let allPetsData = [];
let isAnimating = false

async function petsData() {
 let response = await fetch("../../pets.json")
 allPetsData = await response.json();
 
let cards = getCardsCount()
 for(let i = 0; i < cards; i++) {
  let randomPets = Math.floor(Math.random() * allPetsData.length)
  let chosenPets = allPetsData[randomPets]
  mainPetsCards.push(chosenPets)

 }
 console.log(mainPetsCards)
 drawingCards()
}


window.addEventListener('resize', () => {
  let cards = getCardsCount()
  if (mainPetsCards.length !== cards) {
 petsData();
  }
})
function getCardsCount() {
  let width = window.innerWidth;

  if (width >= 1280) return 3;
  
  if (width >= 768)  return 2;
  
  return 1;
  
}

function generateNextSlides() {
 if(isAnimating) return;

 isAnimating = true;

 let nextPetsCards = [];
 let cards = getCardsCount()
 while(nextPetsCards.length < cards) {
    let randomPets = Math.floor(Math.random() * allPetsData.length) 
    let chosenPets = allPetsData[randomPets]

    if(!nextPetsCards.includes(chosenPets) && !mainPetsCards.includes(chosenPets)) {
      nextPetsCards.push(chosenPets)
    }
 }

 mainPetsCards = nextPetsCards;
 

 sliderTrack.classList.add("sliding__next")
  setTimeout(() => {
     drawingCards();
     isAnimating = false;
    sliderTrack.classList.remove("sliding__next")
  },100)

}

function drawingCards() {
 sliderTrack.innerHTML = ``;
 mainPetsCards.forEach(pet => {
   sliderTrack.innerHTML += `
   <article class="pets__card">
               <img src="${pet.img}" alt="${pet.type}">
               <h4>${pet.name}</h4>
               <button>Learn more</button>
              </article>
   `
   
 })
}

function generatePrevSlides() {
  if(isAnimating) return;
  isAnimating = true;

  let prevPetsCards = [];
  let cards = getCardsCount()
  while (prevPetsCards.length < cards) {
  let randomPets = Math.floor(Math.random() * allPetsData.length)
  let chosenPets = allPetsData[randomPets]
  if (!prevPetsCards.includes(chosenPets) && !mainPetsCards.includes(chosenPets)) {
    prevPetsCards.push(chosenPets)
  }
  }
  mainPetsCards = prevPetsCards;
  console.log(mainPetsCards);

  sliderTrack.classList.add("sliding__prev")
  setTimeout(() => {
    sliderTrack.classList.remove("sliding__prev")
    drawingCards();
    isAnimating = false
  },100)

}


