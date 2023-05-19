var cont = 0;



/*function classifica_home(){ 
    let array = [];


  const top1 = document.getElementById("top1");
  top1.textContent = array[0];
  const punto1 = document.getElementById("punto1");
  punto1.textContent = classifica[array[0]];

  const top2 = document.getElementById("top2");
  top2.textContent = array[1];
  const punto2 = document.getElementById("punto2");
  punto2.textContent = classifica[array[1]];

  const top3 = document.getElementById("top3");
  top3.textContent = array[2];
  const punto3 = document.getElementById("punto3");
  punto3.textContent = classifica[array[2]];

  const top4 = document.getElementById("top4");
  top4.textContent = array[3];
  const punto4 = document.getElementById("punto4");
  punto4.textContent = classifica[array[3]];

  const top5 = document.getElementById("top5");
  top5.textContent = array[4];
  const punto5 = document.getElementById("punto5");
  punto5.textContent = classifica[array[4]];

  const top6 = document.getElementById("top6");
  top6.textContent = array[5];
  const punto6 = document.getElementById("punto6");
  punto6.textContent = classifica[array[5]];
   
}*/



window.onload = function(){
    classifica_home();
    let nomeUtente = document.getElementById("nome_utente");
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







