<?php
session_start();

    $mysqli = new mysqli("localhost", "root", "", "register_database");

    if ($mysqli->connect_errno) {
        echo "Errore di connessione al database: " . $mysqli->connect_error;
        exit;
    }

    $sql_classifica = "SELECT nome_utente, puntiClassifica FROM utente ORDER BY puntiClassifica DESC";
    $result_classifica = $mysqli->query($sql_classifica);

    if (!$result_classifica) {
        echo "Errore nella query: " . $mysqli->error;
        exit;
    }

    $utenti = array(); // Array per memorizzare i record degli utenti

    while ($row = $result_classifica->fetch_assoc()) {
        $utenti[] = $row; // Aggiungi il record all'array
    }

    echo json_encode($utenti); //File json con le informazioni degli utenti e i relativi punti classifica.
    
    $mysqli->close();

?>