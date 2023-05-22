function presa_elementi_registrazione(){

    let nome_utente = document.form_registrazione.nome_utente_r.value;
    let email = document.form_registrazione.email_r.value;
    let password = document.form_registrazione.password_r.value;
    let nome = document.getElementById("nome").value;
    let cognome = document.getElementById("cognome").value;
    let password_conferma = document.form_registrazione.cpassword_r.value;

    //CONTROLLA SE I CAMPI SONO VUOTI

    if(nome==""){
        alert("Non hai inserito il nome!");
        return false;
    }

    if(cognome==""){
        alert("Non hai inserito il cognome!");
        return false;
    }

    if(nome_utente==""){
        alert("Non hai inserito il nome utente!");
        return false;
    }

    if(nome_utente.length < 4){
        alert("Il nome utente deve essere almeno di 4 caratteri!");
        return false;
    }

    if(nome_utente.length > 12){
        alert("Il nome utente deve essere massimo di 12 caratteri!");
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

    if(password.length < 6){
        alert("La password deve essere almeno di 6 caratteri!");
        return false;
    }

    if(password_conferma == ""){
        alert("Il campo per la conferma della password non può essere vuoto!");
        return false;
    }

    if(password_conferma != password){
        alert("Le password non coincidono!");
        return false;
    }

    return true;

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

    return true;

}