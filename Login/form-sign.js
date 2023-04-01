function presa_elementi_registrazione(){

    let nome_utente = document.form_registrazione.nome_utente_r.value;
    let email = document.form_registrazione.email_r.value;
    let password = document.form_registrazione.password_r.value;  

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

function presa_elementi_login(){

    let email = document.form_login.email_l.value;
    let password = document.form_login.password_l.value;  

    if(email==""){
        alert("Non hai inserito l'email!");
        return false;
    }

    if(password==""){
        alert("Non hai inserito la password!");
        return false;
    }

}















