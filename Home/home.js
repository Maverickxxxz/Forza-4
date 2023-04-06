let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
};

function revealFunction(){
    window.sr = ScrollReveal({
        distance: '65px',
        duration: 2600,
        delay: 450,
        easing: 'ease-out'
    });

    
    sr.reveal('.hero-text', {delay:200, origin:'left', reset:false});
    sr.reveal('.hero-img', {delay:450, origin:'right', reset:false});
    sr.reveal('.scroll-down', {delay:500, origin:'bottom', reset:false});
    sr.reveal('.animato', {delay:450, origin:'top', reset:false});
    sr.reveal('.navlist', {delay:450, origin:'top', reset:false});
}

window.addEventListener('load', () => {
    revealFunction();
})

function menuToggle() {
    var img = document.getElementById("board");
    const toggleMenu = document.querySelector(".menu");
    toggleMenu.classList.toggle("active");
    img.style.width = '300px';

}



