<?php

session_start();

$conn = new mysqli("localhost", "root", "", "register_database");

// Verifica la connessione
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

// Ottieni l'ID o l'identificatore dall'input
$utente_id = $_POST['utente_id'];
$newPassword = $_POST['newPassword'];
$oldPassword = $_POST['oldPassword'];
$newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);

$sql = "SELECT password_hash FROM utente WHERE id = {$_SESSION["utente_id"]}";

$result = $conn->query($sql);
if ($result && $result->num_rows > 0) {
    $pass = $result->fetch_assoc();
}

if ($oldPassword !== "") {
    $password_bool = password_verify($oldPassword, $pass["password_hash"]);

    if ($password_bool) {
        $password_bool2 = password_verify($newPassword, $pass["password_hash"]);

        if (!$password_bool2) {
            // Esegui la query per aggiornare la password
            $sql = "UPDATE utente SET password_hash = '$newPasswordHash' WHERE id = {$_SESSION["utente_id"]}";

            if ($conn->query($sql) === TRUE) {
                echo "Password aggiornata con successo";
            } else {
                echo "Errore durante l'aggiornamento: " . $conn->error;
            }
        } else {
            echo "La password non può essere uguale alla precedente!!";
        }
    } else {
        echo "La password vecchia è sbagliata!";
    }
} else {
    echo "La password vecchia è vuota!";
}

$conn->close();

?>


