<?php

session_start();

$conn = new mysqli("localhost", "root", "", "register_database");

// Verifica la connessione
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

// Ottieni l'ID o l'identificatore dall'input
$utente_id = $_SESSION["utente_id"];

// Query per eliminare l'istanza
$sql = "DELETE FROM utente WHERE id = {$_SESSION["utente_id"]}";

if ($conn->query($sql) === TRUE) {
    echo "Istanza eliminata con successo";
} else {
    echo "Errore durante l'eliminazione dell'istanza: " . $conn->error;
}

$conn->close();
?>