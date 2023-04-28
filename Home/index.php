<?php
    session_start(); 
    
    if (isset($_SESSION["utente_id"])) {
    
        $mysqli = require __DIR__ . "/../Login/database.php";
        
        $sql = "SELECT * FROM utente
                WHERE id = {$_SESSION["utente_id"]}";
                
        $result = $mysqli->query($sql);
        
        $utente = $result->fetch_assoc();
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
    <script src=
    "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js">
    </script>

    <!-- FRAMEWORK CSS ESTERNI -->
    <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.0.0/fonts/remixicon.css" rel="stylesheet">

    <!-- FONT SCARICATI DA GOOGLE -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pangolin&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
    <title>Home</title>
</head>

<body>

    <!-- HEADER CON LOGO E BOTTONI -->
    <header class="mt-3">
        <!-- <a id="logo1" href="index.html" class="animato" style="font-size: 50px;">CONNECT</a>
        <a id="logo2" href="index.html" class="animato me-auto ms-1" style="font-size: 80px;">4</a>-->
        <img class = "animato" src="../sources/logo-connect4.png" width="30%"> 

        <ul class="navlist">
            <li><a id="elem1" href="index.html" class="active">Home</a></li>
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
            <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <a>GIOCA ORA!</a>
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
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked>
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Locale
                                </label>
                                <i class="ri-information-line">
                                <span class="info">Gioca contro il tuo avversario sullo stesso pc!</span>
                                </i>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" >
                                <label class="form-check-label" for="flexRadioDefault2">
                                    Multiplayer
                                </label>
                                <i class="ri-information-line">
                                <span class="info">Gioca contro il tuo avversario su un altro pc!</span>
                                </i>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" >
                                <label class="form-check-label" for="flexRadioDefault2">
                                    IA
                                </label>
                                <i class="ri-information-line">
                                <span class="info">Prova a sfidare l'IA!</span>
                                </i>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Indietro</button>
                        <button type="button" class="btn bg-custom">Gioca</button>
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

    <section id="img-down" class="d-flex flex-column justify-content-start">
        <div class="container text-center text-md-left mt-3" data-aos="fade-up">
            <h1 class="testo ">COME SI GIOCA</h1>
            <h2 class="testo2">Non conosci il gioco o le regole del gioco? <br>
                Non ti preoccupare e leggi di seguito!</h2>
            <div class="griglia justify-content-center align-items-center">
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
            <a href="#" class="btn-get-started scrollto">Get Started</a>
        </div>
    </section>

    <!-- SCROLL DOWN -->
    <div class="scroll-down">
        <a href="#sezione1"><i class="ri-arrow-up-s-line"></i></a>
    </div>

    <script src="https://unpkg.com/scrollreveal"></script>

    <script src="../Home/home.js" type="text/javascript"></script>

</body>

</html>