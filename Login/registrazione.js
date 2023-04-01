function clickLogin(numero){
    let bottoneRegistrati = document.getElementById("bottoneRegistrati");
    let campo_nome = document.getElementById("campo_nome");
    let titolo = document.getElementById("titolo");
    let bottoneLogin = document.getElementById("bottoneLogin");


    if(numero==1){
       
    campo_nome.style.maxHeight = 0; //Cancella il campo nome
    titolo.innerHTML = "Accedi";
    bottoneRegistrati.classList.add("disabilitato");
    bottoneLogin.classList.remove("disabilitato");
    }

    if(numero==0){
       
        campo_nome.style.maxHeight = "60px"; //Cancella il campo nome
        titolo.innerHTML = "Registrati";
        bottoneRegistrati.classList.remove("disabilitato");
        bottoneLogin.classList.add("disabilitato");
        }
}  

function prova(ciao){
    var prova = ciao;
    alert(prova);
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







