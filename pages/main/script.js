// Burger menu
const navbar = document.getElementById("navbar")
const hamburgerMenu = document.getElementById("hamburger-menu")
const overlay = document.getElementById("overlay")
const navlinks = document.querySelectorAll(".nav-link");


navlinks.forEach(link => {
    link.addEventListener('click', (e) => {
      navlinks.forEach(l => l.classList.remove('active'))

      e.target.classList.add('active');
 closeNavbar()
    })
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
const slideBtnRight = document.querySelector(".pets__slide-button.next");
const sliderTrack = document.querySelector(".pets__track");

let allPetsData = [];
let currentCards = [];

function getCardsCount() {
  let width = window.innerWidth;
  if (width >= 1280) return 3;
  if (width >= 768) return 2;
  return 1;
}


async function getPetsCards() {
  try {
    const response = await fetch("../../pets.json");

    if (!response.ok) {
      throw new Error(`file is not found: Status: ${response.status}`);
    }
    allPetsData = await response.json();
    console.log("Data came:", allPetsData);

    
    renderNextCards();
  } catch (error) {
    console.log("Download error:", error.message);
  }
}


function getRandomPets() {
  const count = getCardsCount();
  const newPets = [];

  while (newPets.length < count) {
    const randomIndex = Math.floor(Math.random() * allPetsData.length);
    const chosenPet = allPetsData[randomIndex];

    if (!newPets.includes(chosenPet) && !currentCards.includes(chosenPet)) {
      newPets.push(chosenPet);
    }
  }
  return newPets;
}


function createCardHTML(pet) {
  return `
    <article class="pets__card" data-name="${pet.name}">
      <img src="${pet.img}" alt="${pet.type} - ${pet.breed}">
      <h4>${pet.name}</h4>
      <button>Learn more</button>
    </article>
  `;
}


function renderNextCards() {
  const nextCards = getRandomPets();
  currentCards = nextCards;
  
  
  sliderTrack.innerHTML = nextCards.map(createCardHTML).join("");
}

slideBtnRight.addEventListener("click", renderNextCards);
slideBtnLeft.addEventListener("click", renderNextCards);

getPetsCards();

// Popup (pet card details)
 const popupOverlay = document.getElementById("popup-overlay")
 const popupImg = document.getElementById("popupImg");
 const popupTitle = document.getElementById("popupTitle");
 const popupSubtitle = document.getElementById("popupSubtitle");
 const popupDescription = document.getElementById("popupDescription");
 const popupAge = document.getElementById("age")
 const popupInoculations = document.getElementById("inoculations")
 const popupDiseases = document.getElementById("diseases")
 const popupParasites = document.getElementById("parasites")
 const closeBtn = document.getElementById("closeBtn")

sliderTrack.addEventListener('click', (e) => {
 const card = e.target.closest('.pets__card');

 if (card) {
  const clickedName = card.querySelector("h4").textContent.trim();
  openPopup(clickedName)
 }
})

 function openPopup(clickedName) {
  

  const foundPet = allPetsData.find(pet => pet.name === clickedName);

  

if(!foundPet) return;

  popupTitle.textContent = foundPet.name;
  popupSubtitle.textContent = `${foundPet.type} - ${foundPet.breed}`
  popupDescription.textContent = foundPet.description;
  popupImg.src = foundPet.img;
  popupAge.textContent = foundPet.age;
  popupInoculations.textContent = foundPet.inoculations.join(', ');
  popupDiseases.textContent = foundPet.diseases.join(', ');
  popupParasites.textContent = foundPet.parasites.join(', ')
 document.body.style.overflow = 'hidden'
 popupOverlay.classList.add('active')
};

closeBtn.addEventListener('click',closePopup)

function closePopup() {
  popupOverlay.classList.remove('active');
  document.body.style.overflow = '';

}

popupOverlay.addEventListener('click', (e) => {
if (e.target === popupOverlay) {
  closePopup()
}
})



