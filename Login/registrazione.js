

const urlParams = new URLSearchParams(window.location.search);
var stato = urlParams.get('reg');



//CONTROLLA SE L'UTENTE HA CLICCATO LOGIN O REGISTRATI
if(stato=="login"){
    var obj = document.getElementById("campo_nome");
    
    campo_nome.style.maxHeight = 0; //Cancella il campo nome
    titolo.innerHTML = "Accedi";
    bottoneRegistrati.classList.add("disabilitato");
    bottoneLogin.classList.remove("disabilitato");
}

if(stato=="signup"){
    campo_nome.style.maxHeight = "60px"; 
    titolo.innerHTML = "Registrati";
    bottoneRegistrati.classList.remove("disabilitato");
    bottoneLogin.classList.add("disabilitato");
    
}

function clickLogin(numero){

    let bottoneRegistrati = document.getElementById("bottoneRegistrati");
    let campo_nome = document.getElementById("campo_nome");
    let titolo = document.getElementById("titolo");
    let bottoneLogin = document.getElementById("bottoneLogin");

    if(numero==1){ //FORM LOGIN
        campo_nome.style.maxHeight = 0; //Cancella il campo nome
        titolo.innerHTML = "Accedi";
        bottoneRegistrati.classList.add("disabilitato");
        bottoneLogin.classList.remove("disabilitato");
    }

    if(numero==0){ //FORM REGISTRAZIONE
        campo_nome.style.maxHeight = "60px"; 
        titolo.innerHTML = "Registrati";
        bottoneRegistrati.classList.remove("disabilitato");
        bottoneLogin.classList.add("disabilitato");
        
    }

}  

function presa_elementi_registrazione(){
    let nome_utente = document.form_registrazione.nome_utente.value;
    let email = document.form_registrazione.email.value;
    let password = document.form_registrazione.password.value;  

    var inviato = false;


    //CONTROLLA SE I CAMPI SONO VUOTI
    if(nome_utente==""){
        alert("Non hai inserito il nome utente!");
        return false;
    }

    if(email==""){
        alert("Non hai inserito l'email!");
        return false;
    }

    if(password==""){
        alert("Non hai inserito la password!");
        return false;
    }
}







