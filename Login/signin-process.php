<?php

$is_invalid = false;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    $mysqli = require __DIR__ . "\database.php";
    
    $sql = sprintf("SELECT * FROM utente
                    WHERE email = '%s'",
                   $mysqli->real_escape_string($_POST["email_l"]));
    
    $result = $mysqli->query($sql); //si fa partire la query sql e la inizializziamo in result
    
    $user = $result->fetch_assoc(); //se trovata una corrispondenza assegniamo a user il result
    
    if ($user) { // contiene dati validi? se sì, verifica se è uguale la password
        
        if (password_verify($_POST["password_l"], $user["password_hash"])) {
            
            session_start();
            
            session_regenerate_id();
            
            $_SESSION["utente_id"] = $user["id"]; //memorizziamo nella sessione corrente l'id dell'utente
            
            header("Location: signin-success.html");
            exit;
        }
    }
    
    $is_invalid = true; // se fallisce la verifica password, invalidazione diventa true
}