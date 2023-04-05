<?php
$host = "localhost";
$dbname = "register_database";
$username = "root";
$password = "";

$mysqli = new mysqli(hostname: $host, 
                     username: $username,
                     password: $password, 
                     database: $dbname); 



if($mysqli->connect_errno){ //SE C'è UN ERRORE DI CONNESSIONE MOSTRA L'ERRORE
    die("Errore di connessione: " . $mysqli->connect_error); // IL PUNTO SERVE PER CONCATENARE DUE STRINGHE INSIEME
}


return $mysqli; 

?>