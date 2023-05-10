
var cont = 0;


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



