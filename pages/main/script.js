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

