<?php

if (isset($_SESSION["utente_id"])) {
    $mysqli = new mysqli("localhost", "root", "", "register_database");

    if ($mysqli->connect_errno) {
        echo "Errore di connessione al database: " . $mysqli->connect_error;
        exit;
    }

    $utente_id = $_SESSION["utente_id"];

    $sql = "SELECT nome_utente, puntiClassifica FROM utente ORDER BY puntiClassifica DESC";
    $result = $mysqli->query($sql);

    if (!$result) {
        echo "Errore nella query: " . $mysqli->error;
        exit;
    }

    $utenti = array(); // Array per memorizzare i record degli utenti

    while ($row = $result->fetch_assoc()) {
        $utenti[] = $row; // Aggiungi il record all'array
    }

    echo json_encode($utenti);

    $mysqli->close();
}
?>