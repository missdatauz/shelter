// Burger menu
const navbar = document.getElementById("navbar")
const hamburgerMenu = document.getElementById("hamburger-menu")
const overlay = document.getElementById("overlay")
const navlinks = document.querySelectorAll(".nav-link");


let cardCount = 3;
if (window.innerWidth < 1280 && window.innerWidth >= 768) {
    cardCount = 2;
} else if (window.innerWidth < 768) {
    cardCount = 1;
}
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


function getCardCount() {
    if (window.innerWidth >= 1280) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
}


hamburgerMenu.addEventListener('click', openNavbar)
overlay.addEventListener('click', closeNavbar);
