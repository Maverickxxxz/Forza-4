
var cont = 0;

window.onload = function(){
    let nomeUtente = document.getElementById("nome_utente");
    console.log(nomeUtente);
    if (!nomeUtente) {
        document.getElementById('gioca_ora').disabled = true;

    }
}

function menuTo(){
    const toggle = document.querySelector(".navlist");
    toggle.classList.toggle("active");
}


$("#elem1").on({
    mouseenter: function(){
        $(this).addClass("active");
    },
    mouseleave: function(){
        $(this).removeClass("active");
    }
})

$("#elem2").on({
    mouseenter: function(){
        $("#elem1").removeClass("active");
        $(this).addClass("active");
    },
    mouseleave: function(){
        $("#elem1").addClass("active");
        $(this).removeClass("active");
    }
})

$("#elem3").on({
    mouseenter: function(){
        $("#elem1").removeClass("active");
        $(this).addClass("active");
    },
    mouseleave: function(){
        $("#elem1").addClass("active");
        $(this).removeClass("active");
    }
})

$("#elem4").on({
    mouseenter: function(){
        $("#elem1").removeClass("active");
        $(this).addClass("active");
    },
    mouseleave: function(){
        $("#elem1").addClass("active");
        $(this).removeClass("active");
    }
})

$("#elem5").on({
    mouseenter: function(){
        $("#elem1").removeClass("active");
        $(this).addClass("active");
    },
    mouseleave: function(){
        $("#elem1").addClass("active");
        $(this).removeClass("active");
    }
})

<<<<<<< HEAD
=======
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

>>>>>>> bbd4fad45fbd3aad3b3023dc5d4f2d418720695b
function menuToggle() {
    var img = document.getElementById("board");
    if(cont == 0){
        const toggleMenu = document.querySelector(".menu");
        toggleMenu.classList.toggle("active");
        img.style.width = '300px';
        cont = 1;
    }
    else{
        const toggleMenu = document.querySelector(".menu");
        toggleMenu.classList.toggle("active");
        img.style.width = '500px';
        cont = 0;
    }  
}




