<?php
session_start();

if (isset($_SESSION["utente_id"])) {
    $utente_id = $_SESSION["utente_id"];
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="profile.css">
    <link rel="stylesheet" href="fontawesome/css/all.css">
    <link rel="stylesheet" type="text/css" href="../bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../bootstrap/css/bootstrap.min.css">
    <script src="../bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css" rel="stylesheet">
    <script src="profile.js"></script>

    <!-- JQUERY -->
    <title>Il mio profilo</title>
</head>
<body>
    <header>
        <!-- Navbar -->
              <nav class="navbar navbar-expand-lg navbar-dark d-none d-lg-block">
                  <div class="container-fluid">
                  <!-- Navbar brand -->
                  <a class="navbar-brand nav-link" target="_self" href="../Home/index.php">
                      <img class = "animato "src="../sources/logo-connect4.png" width="200%">
                  </a>

                  <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarExample01"
                      aria-controls="navbarExample01" aria-expanded="false" aria-label="Toggle navigation">
                      <i class="fas fa-bars"></i>
                  </button>
                  <div class="collapse navbar-collapse justify-content-end" id="navbarExample01">
      
                      <ul class="navbar-nav list-inline">
                      <!-- Icons -->
                      <li class="nav-item2">
                          <a class="nav-link" href="https://www.youtube.com/" rel="nofollow"
                          target="_blank">
                          <i class="fab fa-youtube"></i>
                          </a>
                      </li>
                      <li class="nav-item2">
                          <a class="nav-link" href="https://it-it.facebook.com/" rel="nofollow" target="_blank">
                          <i class="fab fa-facebook-f"></i>
                          </a>
                      </li>
                      <li class="nav-item2">
                          <a class="nav-link" href="https://twitter.com/" rel="nofollow" target="_blank">
                          <i class="fab fa-twitter"></i>
                          </a>
                      </li>
                      <li class="nav-item2">
                          <a class="nav-link" href="https://github.com/" rel="nofollow" target="_blank">
                          <i class="fab fa-github"></i>
                          </a>
                      </li>
                      </ul>
                  </div>
                  </div>
              </nav>
          </header>

    <section class="py-5 my-5">
		<div class="container">
            <div class="home"><a href="../Home/index.php"><svg class="bottonehome" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="96" height="96" style="margin-left: -21%; margin-top: -6%"><path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 11V8L8 12L12 16V13H16V11H12Z" fill="black"></path></svg></a></div>
			<div class="bg shadow rounded-lg d-block d-sm-flex">
				<div class="profile-tab-nav border-right">
					<div class="p-4">
						<div class="img-circle text-center mb-3">
							<img src="../sources/immagineprofilo.png" alt="Image" class="shadow">
						</div>
						<h4 class="text-center" id="nomeu"></h4>
					</div>
					<div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
						<a class="nav-link active" id="account-tab" data-toggle="pill" href="#account" role="tab" aria-controls="account" aria-selected="true">
							<i class="fa fa-home text-center mr-1"></i> 
							Account
						</a>
						<a class="nav-link" id="password-tab" data-toggle="pill" href="#password" role="tab" aria-controls="password" aria-selected="false">
							<i class="fa fa-key text-center mr-1"></i> 
							Password
						</a>
						<a class="nav-link" id="security-tab" data-toggle="pill" href="#security" role="tab" aria-controls="security" aria-selected="false">
							<i class="fa fa-user text-center mr-1"></i> 
							Sicurezza
						</a>
						<a class="nav-link" id="application-tab" data-toggle="pill" href="#application" role="tab" aria-controls="application" aria-selected="false">
							<i class="fa fa-gamepad text-center mr-1"></i> 
							Record
						</a>
						<a class="nav-link" id="notification-tab" data-toggle="pill" href="#notification" role="tab" aria-controls="notification" aria-selected="false">
							<i class="fa fa-bell text-center mr-1"></i> 
							Notifiche
						</a>
					</div>
				</div>
				<div class="tab-content p-4 p-md-5" id="v-pills-tabContent">
					<div class="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
						<h3 class="mb-4">Impostazioni Account</h3>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
								  	<label>Nome:</label>
								  	<input disabled value="" id="nome" disabled type="text" class="form-control">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
								  	<label>Cognome:</label>
								  	<input disabled id="cognome" type="text" class="form-control" value="">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
								  	<label>Email:</label>
								  	<input disabled id="email" type="text" class="form-control" value="">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
								  	<label>Numero di Telefono:</label>
								  	<input disabled id="num" type="text" class="form-control" value="">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
								  	<label>Data di nascita:</label>
								  	<input disabled id="data" type="date" id="eta" class="form-control">
								</div>
							</div>
                            <div class="col-md-6">
								<div class="form-group">
							        <button id ="elimina" class="btn" onclick="eliminaIstanza();">Elimina Account</button>
								</div>
							</div>
						</div>
						<div>
							<button disabled id ="conferma" class="btn">Conferma Modifiche</button>
							<button id="aggiorna" class="btn">Aggiorna</button>
						</div>
					</div>
					<div class="tab-pane fade" id="password" role="tabpanel" aria-labelledby="password-tab">
						<h3 class="mb-4">Aggiorna Password</h3>
                        <div class="row">
							<div class="col-md-6">
								<div class="form-group">
								  	<label>Vecchia password</label>
								  	<input id="old" disabled type="password" class="form-control">
								</div>
							</div>
                        </div>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
								  	<label>Nuova password</label>
								  	<input id="new" disabled type="password" class="form-control">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
								  	<label>Conferma nuova password</label>
								  	<input id="confirm" disabled type="password" class="form-control">
								</div>
							</div>
						</div>
						<div>
							<button disabled id ="conferma2" class="btn btn-primary" onclick="aggiornaPass();">Conferma Modifiche</button>
							<button id="aggiorna2" class="btn">Modifica</button>
						</div>
					</div>
					<div class="tab-pane fade" id="security" role="tabpanel" aria-labelledby="security-tab">
						<h3 class="mb-4">Impostazione di sicurezza:</h3>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
								  	<label>Login:</label>
								  	<input id="login" disabled type="text" class="form-control">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
								  	<label>Autenticazione a due fattori:</label>
								  	<input disabled id="aut" type="text" class="form-control">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<div class="form-check">
										<input disabled id="rec" class="form-check-input" type="checkbox" value="" id="recovery">
										<label class="form-check-label" for="recovery">
										Recovery
										</label>
									</div>
								</div>
							</div>
						</div>
						<div>
							<button disabled id ="conferma3" class="btn btn-primary">Conferma Modifiche</button>
							<button disabled id="aggiorna3" class="btn">Aggiorna</button>
						</div>
					</div>
					<div class="tab-pane fade" id="application" role="tabpanel" aria-labelledby="application-tab">
						<h3 class="mb-4">Dati di gioco:</h3>
						<div class="row">
							<div class="col-md-6">
                                <div class="form-group">
								  	<label>Punti di gioco:</label>
								  	<input disabled value="" id="punti" disabled type="text" class="form-control">
								</div>
							</div>
                            <div class="col-md-6">
								<div class="form-group">
								  	<label>Tag di gioco:</label>
								  	<div class="mt-1">
                                        <select disabled id="tag" name="Tag" id="tag" size="1" cols="3">
                                            <option selected value="nessuno"></option>
                                            <option value="L'ingegnere">L'ingegnere</option>
                                            <option value="L'assassino">L'assassino</option>
                                            <option value="Il mago">Il mago</option>
                                            <option value="Il maestro">Il maestro</option>
                                        </select>
                                    </div>
								</div>
							</div>
						</div>
                        <div>
							<button disabled id ="conferma4" class="btn btn-primary">Conferma Modifiche</button>
							<button id="aggiorna4" class="btn">Aggiorna</button>
						</div>
					</div>
					<div class="tab-pane fade" id="notification" role="tabpanel" aria-labelledby="notification-tab">
						<h3 class="mb-4">Notifiche</h3>
						<div class="form-group">
							<div class="form-check">
								<input disabled id = "not1" class="form-check-input" type="checkbox" value="" id="notification1">
								<label class="form-check-label" for="notification1">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum accusantium accusamus, neque cupiditate quis
								</label>
							</div>
						</div>
						<div class="form-group">
							<div class="form-check">
								<input disabled id="not2" class="form-check-input" type="checkbox" value="" id="notification2" >
								<label class="form-check-label" for="notification2">
									hic nesciunt repellat perferendis voluptatum totam porro eligendi.
								</label>
							</div>
						</div>
						<div class="form-group">
							<div class="form-check">
								<input disabled id="not3" class="form-check-input" type="checkbox" value="" id="notification3" >
								<label class="form-check-label" for="notification3">
									commodi fugiat molestiae tempora corporis. Sed dignissimos suscipit
								</label>
							</div>
						</div>
						<div>
							<button disabled id ="conferma5" class="btn btn-primary">Conferma Modifiche</button>
							<button disabled id="aggiorna5" class="btn">Aggiorna</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
    <footer id="#sezione3">
        <div class="container">
            <div class="row">
                <div class="col-md-4 mx-auto text-center">
                    <h4 class="titleFooter">Contatti</h4>
                    <ul class="list-unstyled">
                    <li id="indirizzo">Indirizzo: <a style="cursor:pointer;" onmouseover="this.style.color='#162975'" onmouseout="this.style.color='#1e3386'">Viale Scalo San Lorenzo, Roma <i class="fa fa-map-marker fa-fw"></i></a></li>
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
                    <p style="color:#fff;">Iscriviti alla newsletter Connect4 per ricevere informazioni su tutte le future novità!</p>
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
    <!-- JQUERY -->
    <script>
        var $aggiorna = $("#aggiorna");
        var $conferma = $("#conferma");
        var $aggiorna2 = $("#aggiorna2");
        var $conferma2 = $("#conferma2");
        var $aggiorna3 = $("#aggiorna3");
        var $conferma3 = $("#conferma3");
        var $aggiorna4 = $("#aggiorna4");
        var $conferma4 = $("#conferma4");
        var $aggiorna5 = $("#aggiorna4");
        var $conferma5 = $("#conferma4");
        $aggiorna.on("click", function(){
            $conferma.removeAttr('disabled');
            $("#data").removeAttr('disabled');
            $("#tag").removeAttr('disabled');
            $("#bio").removeAttr('disabled');
            $("#num").removeAttr('disabled');
            $("#old").removeAttr('disabled');
            $("#new").removeAttr('disabled');
            $("#confirm").removeAttr('disabled');
            $aggiorna.prop("disabled", true);
        })
        $conferma.on("click", function(){
            $aggiorna.removeAttr('disabled');
            $("#nome").prop('disabled',true);
            $("#cognome").prop('disabled',true);
            $("#tag").prop('disabled',true);
            $("#bio").prop('disabled',true);
            $("#num").prop('disabled',true);
            $("#data").prop('disabled',true);
            $conferma.prop("disabled", true);
        })
        $aggiorna2.on("click", function(){
            $conferma2.removeAttr('disabled');
            $("#new").removeAttr('disabled');
            $("#old").removeAttr('disabled');
            $("#confirm").removeAttr('disabled');
            $aggiorna2.prop("disabled", true);
        })
        $conferma2.on("click", function(){
            $aggiorna2.removeAttr('disabled');
            $("#new").prop('disabled',true);
            $("#old").prop('disabled',true);
            $("#confirm").prop('disabled',true);
            $conferma2.prop("disabled", true);
        })
        $aggiorna3.on("click", function(){
            $conferma3.removeAttr('disabled');
            $("#rec").removeAttr('disabled');
            $("#login").removeAttr('disabled');
            $("#aut").removeAttr('disabled');
            $aggiorna3.prop("disabled", true);
        })
        $conferma3.on("click", function(){
            $aggiorna3.removeAttr('disabled');
            $("#rec").prop('disabled',true);
            $("#login").prop('disabled',true);
            $("#aut").prop('disabled',true);
            $conferma3.prop("disabled", true);
        })
        $aggiorna4.on("click", function(){
            $conferma4.removeAttr('disabled');
            $("#tag").removeAttr('disabled');
            $aggiorna4.prop("disabled", true);
        })
        $conferma4.on("click", function(){
            $aggiorna4.removeAttr('disabled');
            $("#tag").prop('disabled',true);
            $conferma4.prop("disabled", true);
        })
        $aggiorna5.on("click", function(){
            $conferma5.removeAttr('disabled');
            $("#not1").removeAttr('disabled');
            $("#not2").removeAttr('disabled');
            $("#not3").removeAttr('disabled');
            $aggiorna5.prop("disabled", true);
        })
        $conferma5.on("click", function(){
            $aggiorna5.removeAttr('disabled');
            $("#not1").prop('disabled',true);
            $("#not2").prop('disabled',true);
            $("#not3").prop('disabled',true);
            $conferma5.prop("disabled", true);
        })
        $(window).on("load", function(){
            $aggiorna.removeAttr('disabled');
            $aggiorna2.removeAttr('disabled');
            $aggiorna4.removeAttr('disabled');
            $("#nome").prop('disabled',true);
            $("#cognome").prop('disabled',true);
            $("#email").prop('disabled',true);
            $("#tag").prop('disabled',true);
            $("#bio").prop('disabled',true);
            $("#num").prop('disabled',true);
            $("#data").prop('disabled',true);
            $("#new").prop('disabled',true);
            $("#old").prop('disabled',true);
            $("confirm").prop('disabled',true);
            $("#rec").prop('disabled',true);
            $("#login").prop('disabled',true);
            $("#aut").prop('disabled',true);
            $("#app").prop('disabled',true);
            $("#lor").prop('disabled',true);
            $("#not1").prop('disabled',true);
            $("#not2").prop('disabled',true);
            $("#not3").prop('disabled',true);
            $conferma.prop("disabled", true);
            $conferma2.prop("disabled", true);
            $conferma3.prop("disabled", true);
            $conferma4.prop("disabled", true);
        })
    </script>
    <script>
        var utente_id = "<?php echo isset($utente_id) ? $utente_id : ''; ?>";
        var nomeu = "";
        $.ajax({
            url: "data.php?id=" + utente_id,
            type: "GET",
            dataType: "json",
            success: function(data) {
                nome = data["nome"];
                cognome = data["cognome"];
                nomeu = data["nome_utente"];
                email = data["email"];
                punti = data["puntiClassifica"];
                document.getElementById("email").value = email;
                document.getElementById("nomeu").textContent = nomeu;
                document.getElementById("nome").value = nome;
                document.getElementById("cognome").value = cognome;
                document.getElementById("punti").value = punti;
                
                
            },
            error: function(xhr, status, error) {
                console.error("Errore nella richiesta AJAX:", status, error);
            }
        });

    </script>

    <script>
        function eliminaIstanza(){
            var idIstanza = 1; // L'ID o l'identificatore dell'istanza da eliminare
            var utente_id = "<?php echo isset($utente_id) ? $utente_id : ''; ?>";
            // Effettua la chiamata AJAX utilizzando jQuery
            $.ajax({
                url: "elimina.php?id=" + utente_id,
                type: "POST",
                data: { id: idIstanza },
                success: function(response) {
                    alert("Account eliminato correttamente!");
                    window.location.href="../Home/index.php";
                },
                error: function(xhr, status, error) {
                console.log("Errore durante la chiamata AJAX:", error);
                }
            });
        } 
    </script>
    <script>
        function aggiornaPass(){
        var idIstanza = 1;
        var utente_id = "<?php echo isset($utente_id) ? $utente_id : ''; ?>";
        var newPassword = $("#new").val();
        var oldPassword = $("#old").val();

        if(newPassword == ""){
            alert("La nuova password non può essere vuota!");
        } else {
            // Effettua la chiamata AJAX solo se la nuova password non è vuota
            $.ajax({
                url: "aggiorna.php",
                type: "POST",
                data: { utente_id: utente_id, newPassword: newPassword, oldPassword: oldPassword},
                success: function(response) {
                    alert(response);
                },
                error: function(xhr, status, error) {
                    console.log("Errore durante la chiamata AJAX:", error);
                }
            });
            }  
        }
    </script>
</body>
</html>