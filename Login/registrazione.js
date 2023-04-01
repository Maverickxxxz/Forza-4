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
    var loalalla;
}