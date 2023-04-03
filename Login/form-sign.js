function getCurrentURL () {
    return window.location.href;
  }

  

function verifica_vuoto(){ // CORREGGE GLI ERRORI DEL PLACEHOLDER
    var url = getCurrentURL();
    if(url=="http://127.0.0.1:5500/Login/registrazione.html"){
        

    let nome_utente_r = document.form_registrazione.nome_utente_r.value;
    nome_utente_r = nome_utente_r.replace(/\s/g, ''); //RIMUOVE GLI SPAZI A NOME_UTENTE

    let email_r = document.form_registrazione.email_r.value;
    email_r = email_r.replace(/\s/g, '');

    let password_r = document.form_registrazione.password_r.value; 
    password_r = password_r.replace(/\s/g, '');

        if(nome_utente_r!=""){
            document.getElementById("label_utente").style.marginTop = "-30px";
            document.getElementById("label_utente").style.fontSize = ".75em";     
        }

        // QUALORA UN UTENTE CANCELLASSE, IL TESTO TORNA AD ESSERE NORMALE
        if(nome_utente_r==""){
            document.getElementById("label_utente").style.marginTop = "2px";
            document.getElementById("label_utente").style.fontSize = "1em"; 
        }

        if(email_r!=""){
            document.getElementById("label_email").style.marginTop = "-30px";
            document.getElementById("label_email").style.fontSize = ".75em";    
        }

        // QUALORA UN UTENTE CANCELLASSE, IL TESTO TORNA AD ESSERE NORMALE
        if(email_r==""){
            document.getElementById("label_email").style.marginTop = "2px";
            document.getElementById("label_email").style.fontSize = "1em"; 
        }

        if(password_r!=""){
            document.getElementById("label_password").style.marginTop = "-30px";
            document.getElementById("label_password").style.fontSize = ".75em";     
        }

        // QUALORA UN UTENTE CANCELLASSE, IL TESTO TORNA AD ESSERE NORMALE
        if(password_r==""){
            document.getElementById("label_password").style.marginTop = "2px";
            document.getElementById("label_password").style.fontSize = "1em"; 
        }
        }


    if(url=="http://127.0.0.1:5500/Login/login.html"){
        let email_l = document.form_login.email_l.value;
        email_l = email_l.replace(/\s/g, '');
  
        let password_l = document.form_login.password_l.value; 
        password_l = password_l.replace(/\s/g, '');

        if(email_l!=""){ 
            document.getElementById("label_email_l").style.marginTop = "-30px";
            document.getElementById("label_email_l").style.fontSize = ".75em";  
        }

        // QUALORA UN UTENTE CANCELLASSE, IL TESTO TORNA AD ESSERE NORMALE
        if(email_l==""){
            document.getElementById("label_email_l").style.marginTop = "2px";
            document.getElementById("label_email_l").style.fontSize = "1em"; 
        }

        if(password_l!=""){
            document.getElementById("label_password_l").style.marginTop = "-30px";
            document.getElementById("label_password_l").style.fontSize = ".75em";     
        }

        // QUALORA UN UTENTE CANCELLASSE, IL TESTO TORNA AD ESSERE NORMALE
        if(password_l==""){
            document.getElementById("label_password_l").style.marginTop = "2px";
            document.getElementById("label_password_l").style.fontSize = "1em"; 
        }

     
    }
    
    }   

    
    
    


    



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















