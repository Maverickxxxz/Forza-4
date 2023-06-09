<?php

$mysqli = require __DIR__ . "/database.php";

$id = rand(111111111,999999999);
$nome_utente = $_POST["nome_utente_r"];
$nome = $_POST["nome"];
$cognome = $_POST["cognome"];
$email = $_POST["email_r"];
$password = $_POST["password_r"];
$password_hash = password_hash($_POST["password_r"], PASSWORD_DEFAULT); //hashed, crittografata

//CONTROLLA PRIMA SE L'UTENTE O L'EMAIL GIà ESISTONO NEL DATABASE.
$sql = "SELECT * FROM utente WHERE nome_utente = ? OR email = ?";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param("ss", $nome_utente, $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo '<script type="text/javascript">';
        echo 'alert("Il nome utente o l\'email esistono già.");';
        echo 'window.location.href = "registrazione.html";';  // Reindirizzamento alla pagina di registrazione dopo l'alert
        echo '</script>';
        exit;
}

$sql = "INSERT INTO register_database . utente (id, nome_utente, nome, cognome, email, password_hash, puntiClassifica)
        VALUES (?, ?, ?, ?, ?, ?, ?)"; 
        
$stmt = $mysqli->stmt_init();

if ( ! $stmt->prepare($sql)) {          //SE FALLISCE LA PREPARAZIONE DELLA QUERY SQL
    die("ERRORE SQL: " . $mysqli->error);
}

$puntiClassifica = 0; // Imposta un valore predefinito per il campo "puntiClassifica"

$stmt->bind_param("isssssi",       // ASSOCIA AI VALORI ? ? ? ? RISPETTIVAMENTE, NAME, EMAIL, PASSWORD(hashed) E puntiClassifica
    $id,
    $nome_utente,
    $nome,
    $cognome,
    $email,
    $password_hash,
    $puntiClassifica //aggiunto puntiClassifica
);
                  
if ($stmt->execute()) { //VIENE ESEGUITA LA QUERY

    session_start(); // Avvia una nuova sessione
    session_regenerate_id(); // Rigenera l'ID di sessione per prevenire attacchi di session fixation
    $_SESSION["utente_id"] = $id; // Memorizza l'ID dell'utente nella sessione

    header("Location: ../Home/index.php"); //L'UTENTE VIENE REINDIRIZZATO A QUESTA PAGINA
    exit;
    
} else {
    
    if ($mysqli->error === "Uncaught mysqli_sql_exception") {      //KNOWN ERROR, VEDE SE LA MAIL è GIà IN USO
        die("Sei gia registrato con questa email!");
    } else {
        die($mysqli->error . " " . $mysqli->errno);
    }
}

?>