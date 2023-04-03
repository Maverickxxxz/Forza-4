<?php


    
    $nome_utente = $_POST['nome_utente_r'];
    $email = $_POST['email_r'];
    $password = $_POST['password_r'];

    //CONNESSIONE AL DATABASE

    $conn = new mysqli('localhost','root','','test');
	if($conn->connect_error){
		echo "$conn->connect_error";
		die("Connessione fallita: ". $conn->connect_error);
	} else {
		$stmt = $conn->prepare("insert into data(nome_utente, email, password) values(?,?,?)");
		$stmt->bind_param("sss", $nome_utente, $email, $password);
		$execval = $stmt->execute();
		echo $execval;
		echo "Registrazione completata!";
		$stmt->close();
		$conn->close();
	}


?>