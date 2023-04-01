function clickLogin(numero, reg){

    let bottoneRegistrati = document.getElementById("bottoneRegistrati");
    let campo_nome = document.getElementById("campo_nome");
    let titolo = document.getElementById("titolo");
    let bottoneLogin = document.getElementById("bottoneLogin");
    let stato = reg;

    if(stato=='false'){
        campo_nome.style.maxHeight = 0; //Cancella il campo nome
        titolo.innerHTML = "Accedi";
        bottoneRegistrati.classList.add("disabilitato");
        bottoneLogin.classList.remove("disabilitato");
    }

    if(stato=='true'){
        campo_nome.style.maxHeight = 0; //Cancella il campo nome
        titolo.innerHTML = "Accedi";
        bottoneRegistrati.classList.add("disabilitato");
        bottoneLogin.classList.remove("disabilitato");
        
    }

    if(numero==1){
       stato = 'false';
    }

    if(numero==0){
        stato = 'true';
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







