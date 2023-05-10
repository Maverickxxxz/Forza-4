<?php
    session_start(); 
    
    
    if (isset($_SESSION["utente_id"])) {
    
        $mysqli = require __DIR__ . "/../Login/database.php";
        
        $sql = "SELECT * FROM utente
                WHERE id = {$_SESSION["utente_id"]}";
                
        $result = $mysqli->query($sql);
        
        $utente = $result->fetch_assoc();

        $nome_utente = $utente["nome_utente"];
      
    }

    
?>

<!DOCTYPE html>
<html lang="en">



<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../bootstrap/css/bootstrap.min.css">
    <script src="../bootstrap/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../Home/mystyle.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="./home.js" type="text/javascript"></script>
    
    <link rel="stylesheet" href="../Profile/fontawesome/css/all.css">

    <!-- FRAMEWORK CSS ESTERNI -->
    <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.0.0/fonts/remixicon.css" rel="stylesheet">

    <!-- FONT SCARICATI DA GOOGLE -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pangolin&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="mystyle.css">
    
    <title>Home</title>
</head>

<body>

    
    


    <!-- HEADER CON LOGO E BOTTONI -->
    <header class="mt-3" id="header">
        <img class="logo" src="../sources/logo-connect4.png"> 

        <ul class="navlist">
            <li><a id="elem1" href="index.php" class="active">Home</a></li>
            <li><a id="elem2" href="#img-down" class="">Come si gioca</a></li>
            <li><a id="elem3" href="#" class="">Classifica</a></li>

            <?php if(isset($utente)):?>
                <li>
                    <div class="action">
                        <div class="profile" onclick="menuToggle();">
                            <img src="../sources/av1.png" />
                        </div>
                        <div class="menu">
                            <h3><a id="nome_utente"> <?= htmlspecialchars(ucfirst($utente["nome_utente"])) ?></a><br /></h3>
                            <ul>
                            <li>
                                <img src="../sources/user2.png" /><a href="../Profile/profile.html">Il mio profilo</a>
                            </li>
                            <li>
                                <img src="../sources/envelope.png" /><a href="#">Messaggi</a>
                            </li>
                            <li><img src="../sources/question.png" /><a href="#">Help</a></li>
                            <li>
                                <img src="../sources/logout.png" /><a href="../Login/logout.php">Logout</a>
                            </li>
                            </ul>
                        </div>
                    </div>
                </li>

            <?php else: ?>
                <li><a id="elem4" href="../Login/login.html" class="">Accedi</a></li>
                <li><a id="elem5" href="../Login/registrazione.html" class="">Registrati</a></li>
            <?php endif;?>
            
        </ul>
        <div class="bx bx-menu" id = "menu-icon" onclick="menuTo();"></div>
        
    </header>

    <!-- SEZIONE CON TESTO A SX E PLAY E A IMMAGINE A DX -->
    <section id = "sezione1" class="hero">
        <div class="hero-text">
            <h4 class="mt-2">PROVA A COMPETERE ANCHE TU!</h4>
            <h1>FORZA 4</h1>
            <p>Da un'idea di <strong>Giulio Di Gregorio</strong> e <strong>Maffongelli Mattia</strong> nasce il gioco dell'anno: 
                competi contro un tuo amico, un bot o un qualsiasi avversario proveniente dall'altra parte del mondo!
                Che aspetti? Non avere paura!
            </p>
            <button type="button" id="gioca_ora" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <!-- HO ELIMINATO QUESTA A !!! <a class = "cta"></a> -->      GIOCA ORA!
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">SELEZIONA UNA MODALITA':</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-check">
                            <button class="btn" id="locale">
                                <a href="../Profile/profile.html">
                                    Locale
                                </a>
                            </button>
                            <button class="btn" id="multiplayer">
                                <a href="http://localhost:8080/stanza.html?nome_utente=<?=urlencode($nome_utente) ?>">Gioca
                                    Multiplayer
                                </a>
                            </button>
                            <button disabled class="btn" id="ia">
                                <a href="">
                                    IA
                                </a>
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <a href="#" class="ctaa"><i class="ri-play-fill"></i>GUARDA IL GAMEPLAY</a>
        </div>

        <div class="hero-img">
            <img id = "board" src="../sources/board-mod.png">
        </div>
    </section>

    <script></script>

    <section id="img-down" class="how">
        <div class="container text-center text-md-left mt-3" data-aos="fade-up">
            <h1 class="testo ">COME SI GIOCA</h1>
            <h2 class="testo2">Non conosci il gioco o le regole del gioco? <br>
                Non ti preoccupare e leggi di seguito!</h2>
            <div class="griglia">
                <div class="card mt-5 ms-5" style="width: 18rem;">
                    <h4 class="mt-1">1</h4>
                    <div class="card-body">
                        <p class="card-text">Avrete davanti una scacchiera 5x5 come quella nella figura sopra. Tu avrai delle pedine blu, il tuo avversario rosse.</p>
                    </div>
                </div>
                <div class="card mt-5 ms-5" style="width: 18rem;">
                    <h4 class="mt-1">2</h4>
                    <div class="card-body">
                        <p class="card-text">L'obiettivo finale sarà quello di avere 4 pedine consecutive dello stesso colore per riga, per colonna o in diagonale. Vince chi per primo raggiunge tale obiettivo!</p>
                    </div>
                </div>
                <div class="card mt-5 ms-5" style="width: 18rem;">
                    <h4 class="mt-1">3</h4>
                    <div class="card-body">
                        <p class="card-text"> A turno dunque dovrete posizionare la vostra pedina in una cella, combinando logica e tattica affinchè riusciate a fare Forza 4 prima del vostro avversario!
                        </p>
                    </div>
                </div>
            </div>
            <!-- <a href="#header" class="btn-get-started scrollto">GIOCA ORA!</a>-->
        </div>
    </section>

    <footer id="#sezione3">
        <div class="container">
            <div class="row">
                <div class="col-md-4 mx-auto text-center">
                    <h4 class="titleFooter">Contatti</h4>
                    <ul class="list-unstyled">
                    <li id="indirizzo">Indirizzo: <a style="cursor:pointer;" onmouseover="this.style.color='#aaa'" onmouseout="this.style.color='#fff'" onclick="openMap();">Viale Scalo San Lorenzo, Roma <i class="fa fa-map-marker fa-fw"></i></a></li>
                    <li>Telefono: <a href="tel:06-1234567">06-1234567 <i class = "fa fa-phone fa-fw"></i></a></li>
                    <li>Email: <a href="mailto:info@connectfour.com">info@connectfour.com <i class="fa fa-mail-bulk fa-fw"></i></a></li>
                    </ul>
                </div>
                <div class="col-md-4 mx-auto text-center">
                <h4 class="titleFooter">Social</h4>
                    <ul class="list-unstyled-icon">
                        <li><a href="https://it-it.facebook.com/" target="_blank"><i class="fab fa-facebook"></i></a></li>
                        <li><a href="https://twitter.com/?lang=it" target="_blank"><i class="fab fa-twitter"></i></a></li>
                        <li><a href="https://www.instagram.com/" target="_blank"><i class="fab fa-instagram"></i></a></li>
                    </ul>
                </div>
                <div class = "col-md-4 mx-auto text-center">
                    <h4 class="titleFooter">Newsletter</h4>
                    <p style="color:white;">Iscriviti alla newsletter Connect4 per ricevere informazioni su tutte le future novità!</p>
                    <form method = "post" action="">
                        <div class = " input-group mb-3">
                            <input type="email" name = "emailIscritto" class="form-control" placeholder="Email" aria-label = "Email" required>
                            <input type="submit" class="btn btn-outline-secondary" id="button-addon2" value="Invia">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </footer>

    <!-- SCROLL DOWN -->
    <div class="scroll-down">
        <a href="#header"><i class="ri-arrow-up-s-line"></i></a>
    </div>

    <script src="https://unpkg.com/scrollreveal"></script>
    <script src="./home.js" type="text/javascript"></script>

</body>

</html>