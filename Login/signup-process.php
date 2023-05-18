<?php

$nome_utente = $_POST["nome_utente_r"];
$email = $_POST["email_r"];
$password = $_POST["password_r"];
$password_hash = password_hash($_POST["password_r"], PASSWORD_DEFAULT); //hashed, crittografata

$mysqli = require __DIR__ . "/database.php";

$sql = "INSERT INTO register_database . utente (nome_utente, email, password_hash, puntiClassifica)
        VALUES (?, ?, ?, ?)"; //aggiunto puntiClassifica
        
$stmt = $mysqli->stmt_init();

if ( ! $stmt->prepare($sql)) {          //SE FALLISCE LA PREPARAZIONE DELLA QUERY SQL
    die("ERRORE SQL: " . $mysqli->error);
}

$puntiClassifica = 0; // Imposta un valore predefinito per il campo "puntiClassifica"

$stmt->bind_param("sssi",       // ASSOCIA AI VALORI ? ? ? ? RISPETTIVAMENTE, NAME, EMAIL, PASSWORD(hashed) E puntiClassifica
    $_POST["nome_utente_r"],
    $_POST["email_r"],
    $password_hash,
    $puntiClassifica //aggiunto puntiClassifica
);
                  
if ($stmt->execute()) { //VIENE ESEGUITA LA QUERY

    header("Location: signup-success.html"); //L'UTENTE VIENE REINDIRIZZATO A QUESTA PAGINA
    exit;
    
} else {
    
    if ($mysqli->error === "Uncaught mysqli_sql_exception") {      //KNOWN ERROR, VEDE SE LA MAIL è GIà IN USO
        die("Sei gia registrato con questa email!");
    } else {
        die($mysqli->error . " " . $mysqli->errno);
    }
}

?>