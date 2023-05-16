<?php
session_start();

if (isset($_SESSION["utente_id"])) {
    $mysqli = new mysqli("localhost", "root", "", "register_database");

    if ($mysqli->connect_errno) {
        echo "Errore di connessione al database: " . $mysqli->connect_error;
        exit;
    }

    $utente_id = $_SESSION["utente_id"];

    $sql = "SELECT * FROM utente WHERE id = {$_SESSION["utente_id"]}";
    $result = $mysqli->query($sql);

    if (!$result) {
        echo "Errore nella query: " . $mysqli->error;
        exit;
    }

    $utente = $result->fetch_assoc();
    echo json_encode($utente["email"]);

    $mysqli->close();
}
?>

  


