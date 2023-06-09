<?php
    //GESTIONE SESSIONE DEGLI UTENTI
    session_start(); 
      
    if (isset($_SESSION["utente_id"])) {
    
        $mysqli = require __DIR__ . "/../Login/database.php";
        
        $sql = "SELECT * FROM utente
                WHERE id = {$_SESSION["utente_id"]}";
                
        $result = $mysqli->query($sql);
        
        $utente = $result->fetch_assoc();

        $nome_utente = $utente["nome_utente"];
        $id = $utente["ID"];
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
    <script src="https://unpkg.com/@phosphor-icons/web"></script>

    <!-- FONT SCARICATI DA GOOGLE -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pangolin&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">

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
            <li><a id="elem3" href="#sezione4" class="">Classifica</a></li>

            <?php if(isset($utente)):?>
                <li>
                    <div class="action">
                        <div class="profile" onclick="menuToggle();">
                            <img src="../sources/immagineprofilo.png" />
                        </div>
                        <div class="menu">
                            <h3><a id="nome_utente"> <?= htmlspecialchars(ucfirst($utente["nome_utente"])) ?></a><br /></h3>
                            <ul>
                            <li>
                                <img src="../sources/user2.png" /><a href="../Profile/profile.php">Il mio profilo</a>
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
            <h2 class="mt-2">GIOCARE A <span style="color: rgb(255, 208, 0);">FORZA</span> <span style="color:red">4</span> NON È MAI STATO COSÌ DIVERTENTE!</h2>
            <p>Da un'idea di <strong>Giulio Di Gregorio</strong> e <strong>Maffongelli Mattia</strong> nasce il gioco dell'anno: 
                competi contro un tuo amico, un bot o un qualsiasi avversario proveniente dall'altra parte del mondo!
                Che aspetti? Non avere paura!
            </p>
            <?php if(isset($utente)):?>
            <button type="button" id="gioca_ora" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <a class = "giocaora"><i class="ri-play-fill" style="margin-left: -5%"></i> Gioca ora!</a>
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">SELEZIONA UNA MODALITÀ:</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div class="modal-body">
                        <div class="form-check">
                            <button class="btn" id="locale">
                                <a href="../game/Locale/gioco.html">
                                    Locale
                                </a>
                            </button>
                            <button class="btn" id="multiplayer">
                                <a href="http://localhost:8080/gioco.html?id=<?=urlencode($id) ?>">
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
            <a href="https://www.youtube.com/watch?v=IhvL8CVtwhk" class="gameplay"><i class="ri-play-fill"></i> GUARDA IL GAMEPLAY</a>

            <?php else: ?>
                <button type="button" id="registrati" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <a class = "giocaora" href="../Login/registrazione.html"><i class="ri-user-3-line" style="margin-left: -5%"></i> Registrati!</a>
                </button>
                <a href="#" class="gameplay"><i class="ri-play-fill"></i>GUARDA IL GAMEPLAY</a>
            <?php endif;?>
        </div>

        <div class="hero-img">
            <img id = "board" src="../sources/board-mod.png">
        </div>
    </section>

    <!-- COME SI GIOCA -->

    <section id="img-down" class="how">
    <div class="text text-center text-md-left mt-auto mb-auto">
        <h1 class="testo">COME SI GIOCA?</h1>
        <h2 class="testo2">Non conosci Forza 4 e le sue regole? <br>
                Te le spieghiamo noi!</h2>
    </div>
    <div class="container">
        
        <div class="card">
            <div class="box">
            <div class="content">
                <h2>01</h2>
                <h3>TABELLA DI GIOCO:</h3>
                <p>La scacchiera di Forza 4 è composta da una griglia rettangolare 6x7, che offre un totale di 42 posizioni in cui posizionare le pedine. 
                    Ogni giocatore dispone di un set di pedine di un colore specifico, giallo e rosso.</p>
            </div>
            </div>
        </div>

        <div class="card">
            <div class="box">
            <div class="content">
                <h2>02</h2>
                <h3>MOSSE ESEGUIBILI:</h3>
                <p>A turno dovrete posizionare la vostra pedina in una cella, combinando logica e tattica affinchè riusciate a fare Forza 4 prima del vostro avversario!</p>
            </div>
            </div>
        </div>

        <div class="card">
            <div class="box">
            <div class="content">
                <h2>03</h2>
                <h3>OBIETTIVO FINALE:</h3>
                <p>L'obiettivo finale sarà quello di avere 4 pedine consecutive dello stesso colore per riga, per colonna o in diagonale. Vince chi per primo raggiunge tale obiettivo!</p>
            </div>
            </div>
        </div>
    </div>
    </section>

    <!-- CLASSIFICA -->

    <div id="sezione4">
        <div class="testocl">
            <h1>CLASSIFICA:</h1>
        </div>
        <div class="crown"><img src="../sources/crown.png" class="coronaimg" alt=""></div>
        <div class="punti">
            <h2 id="aggpunti">AGGIORNAMENTO PUNTI:</h2>
            <ul>
                <li><h2>+3 per chi vince</h2></li>
                <li><h2>+0 per chi perde</h2></li>
                <li><h2>-3 per chi si ritira</h2></li>
            </ul>
        </div>
        <div class="contcl">
            <div id="leaderboard">
                <div class="ribbon"></div>
                    <table>
                        <tr>
                        <td class="number">1</td>
                        <td id="top1" class="name"></td>
                        <td id="punto1" class="points">
                             <img class="gold-medal" src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true" alt="gold medal"/>
                        </td>
                        </tr>
                        <tr>
                        <td class="number">2</td>
                        <td id="top2" class="name"></td>
                        <td id="punto2" class="points"></td>
                        </tr>
                        <tr>
                        <td class="number">3</td>
                        <td id="top3" class="name"></td>
                        <td id="punto3" class="points"></td>
                        </tr>
                        <tr>
                        <td class="number">4</td>
                        <td id="top4" class="name"></td>
                        <td id="punto4" class="points"></td>
                        </tr>
                        <tr>
                        <td class="number">5</td>
                        <td id="top5" class="name"></td>
                        <td id="punto5" class="points"></td>
                        </tr>
                        <tr>
                        <td class="number">6</td>
                        <td id="top6" class="name"></td>
                        <td id="punto6" class="points"></td>
                        </tr>
                        <tr>
                        <td class="number">7</td>
                        <td id="top7" class="name"></td>
                        <td id="punto7" class="points"></td>
                        </tr>
                        <tr>
                        <td class="number">8</td>
                        <td id="top8" class="name"></td>
                        <td id="punto8" class="points"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!--NEWSLETTER-->

    <footer id="sezione3">
        <div class="container">
            <div class="row">
                <div class="col-md-4 mx-auto text-center">
                    <h4 class="titleFooter">Contatti</h4>
                    <ul class="list-unstyled">
                    <li id="indirizzo">Indirizzo: <a style="cursor:pointer;" onmouseover="this.style.color='#aaa'" onmouseout="this.style.color='#fff'" onclick="openMap();">Viale Scalo San Lorenzo, Roma <i class="fa fa-map-marker fa-fw"></i></a></li>
                    <li>Telefono: <a href="tel:06-1234567">06-123456789 <i class = "fa fa-phone fa-fw"></i></a></li>
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
    <script src="./home.js" type="module"></script>

    <script>
        $.ajax({
            url: "data.php",
            type: "GET",
            dataType: "json",
            success: function(data) {
                // Manipola i dati ottenuti come desideri
                for(var i = 0; i < 8; i++){
                    var nome = data[i]["nome_utente"];
                    var punto = data[i]["puntiClassifica"];
                    var divNome = $("#top" + (i + 1)); // Assumendo che gli ID dei div siano "top1", "top2", ecc.
                    var divPunto = $("#punto" + (i + 1));
                
                    // Assegna il nome al contenuto del div
                    divNome.text(nome);
                    divPunto.text(punto);
                }
            },
            error: function(xhr, status, error) {
                console.error("Errore nella richiesta AJAX:", status, error);
            }
        });
    </script>

</body>

</html>