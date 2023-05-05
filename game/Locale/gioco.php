<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../mycss.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../../Profile/fontawesome/css/all.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
    <title>CONNECT FOUR</title>
</head>
<body>
    <!-- <h1>Pure CSS Connect 4</h1> -->
    <header>
  <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-dark d-none d-lg-block">
            <div class="container-fluid">
            <!-- Navbar brand -->
            <a class="navbar-brand nav-link" target="_blank" href="../../Home/index.php">
                <img class = "animato "src="../../sources/logo-connect4.png" width="130px">
            </a>
            <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarExample01"
                aria-controls="navbarExample01" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fas fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarExample01">

                <ul class="navbar-nav list-inline">
                <!-- Icons -->
                <li class="nav-item2">
                    <a class="nav-link" href="https://www.youtube.com/channel/UC5CF7mLQZhvx8O5GODZAhdA" rel="nofollow"
                    target="_blank">
                    <i class="fab fa-youtube"></i>
                    </a>
                </li>
                <li class="nav-item2">
                    <a class="nav-link" href="https://www.facebook.com/mdbootstrap" rel="nofollow" target="_blank">
                    <i class="fab fa-facebook-f"></i>
                    </a>
                </li>
                <li class="nav-item2">
                    <a class="nav-link" href="https://twitter.com/MDBootstrap" rel="nofollow" target="_blank">
                    <i class="fab fa-twitter"></i>
                    </a>
                </li>
                <li class="nav-item2">
                    <a class="nav-link" href="https://github.com/mdbootstrap/mdb-ui-kit" rel="nofollow" target="_blank">
                    <i class="fab fa-github"></i>
                    </a>
                </li>
                </ul>
            </div>
            </div>
        </nav>
    </header>
    <section>
        <form>
            <div class="board">
                <div class="field">
                <div class="grid column">
                    <input type="radio" name="slot11" tabindex="-1" required>
                    <input type="radio" name="slot11" tabindex="-1" required>
                    <div class="disc"></div>
                    <input type="radio" name="slot12" tabindex="-1" required>
                    <input type="radio" name="slot12" tabindex="-1" required>
                    <div class="disc"></div>
                    <input type="radio" name="slot13" tabindex="-1" required>
                    <input type="radio" name="slot13" tabindex="-1" required>
                    <div class="disc"></div>
                    <input type="radio" name="slot14" tabindex="-1" required>
                    <input type="radio" name="slot14" tabindex="-1" required>
                    <div class="disc"></div>
                    <input type="radio" name="slot15" tabindex="-1" required>
                    <input type="radio" name="slot15" tabindex="-1" required>
                    <div class="disc"></div>
                    <input type="radio" name="slot16" tabindex="-1" required>
                    <input type="radio" name="slot16" tabindex="-1" required>
                    <div class="disc"></div>
        
                    <!--Column 1 after-->
                    <div class="column">
                    <input type="radio" name="slot21" tabindex="-1" required>
                    <input type="radio" name="slot21" tabindex="-1" required>
                    <div class="disc"></div>
                    <input type="radio" name="slot22" tabindex="-1" required>
                    <input type="radio" name="slot22" tabindex="-1" required>
                    <div class="disc"></div>
                    <input type="radio" name="slot23" tabindex="-1" required>
                    <input type="radio" name="slot23" tabindex="-1" required>
                    <div class="disc"></div>
                    <input type="radio" name="slot24" tabindex="-1" required>
                    <input type="radio" name="slot24" tabindex="-1" required>
                    <div class="disc"></div>
                    <input type="radio" name="slot25" tabindex="-1" required>
                    <input type="radio" name="slot25" tabindex="-1" required>
                    <div class="disc"></div>
                    <input type="radio" name="slot26" tabindex="-1" required>
                    <input type="radio" name="slot26" tabindex="-1" required>
                    <div class="disc"></div>
        
                    <!--Column 2 after-->
                    <div class="column">
                        <input type="radio" name="slot31" tabindex="-1" required>
                        <input type="radio" name="slot31" tabindex="-1" required>
                        <div class="disc"></div>
                        <input type="radio" name="slot32" tabindex="-1" required>
                        <input type="radio" name="slot32" tabindex="-1" required>
                        <div class="disc"></div>
                        <input type="radio" name="slot33" tabindex="-1" required>
                        <input type="radio" name="slot33" tabindex="-1" required>
                        <div class="disc"></div>
                        <input type="radio" name="slot34" tabindex="-1" required>
                        <input type="radio" name="slot34" tabindex="-1" required>
                        <div class="disc"></div>
                        <input type="radio" name="slot35" tabindex="-1" required>
                        <input type="radio" name="slot35" tabindex="-1" required>
                        <div class="disc"></div>
                        <input type="radio" name="slot36" tabindex="-1" required>
                        <input type="radio" name="slot36" tabindex="-1" required>
                        <div class="disc"></div>
        
                        <!--Column 3 after-->
                        <div class="column">
                        <input type="radio" name="slot41" tabindex="-1" required>
                        <input type="radio" name="slot41" tabindex="-1" required>
                        <div class="disc"></div>
                        <input type="radio" name="slot42" tabindex="-1" required>
                        <input type="radio" name="slot42" tabindex="-1" required>
                        <div class="disc"></div>
                        <input type="radio" name="slot43" tabindex="-1" required>
                        <input type="radio" name="slot43" tabindex="-1" required>
                        <div class="disc"></div>
                        <input type="radio" name="slot44" tabindex="-1" required>
                        <input type="radio" name="slot44" tabindex="-1" required>
                        <div class="disc"></div>
                        <input type="radio" name="slot45" tabindex="-1" required>
                        <input type="radio" name="slot45" tabindex="-1" required>
                        <div class="disc"></div>
                        <input type="radio" name="slot46" tabindex="-1" required>
                        <input type="radio" name="slot46" tabindex="-1" required>
                        <div class="disc"></div>
        
                        <!--Column 4 after-->
                        <div class="column">
                            <input type="radio" name="slot51" tabindex="-1" required>
                            <input type="radio" name="slot51" tabindex="-1" required>
                            <div class="disc"></div>
                            <input type="radio" name="slot52" tabindex="-1" required>
                            <input type="radio" name="slot52" tabindex="-1" required>
                            <div class="disc"></div>
                            <input type="radio" name="slot53" tabindex="-1" required>
                            <input type="radio" name="slot53" tabindex="-1" required>
                            <div class="disc"></div>
                            <input type="radio" name="slot54" tabindex="-1" required>
                            <input type="radio" name="slot54" tabindex="-1" required>
                            <div class="disc"></div>
                            <input type="radio" name="slot55" tabindex="-1" required>
                            <input type="radio" name="slot55" tabindex="-1" required>
                            <div class="disc"></div>
                            <input type="radio" name="slot56" tabindex="-1" required>
                            <input type="radio" name="slot56" tabindex="-1" required>
                            <div class="disc"></div>
        
                            <!--Column 5 after-->
                            <div class="column">
                            <input type="radio" name="slot61" tabindex="-1" required>
                            <input type="radio" name="slot61" tabindex="-1" required>
                            <div class="disc"></div>
                            <input type="radio" name="slot62" tabindex="-1" required>
                            <input type="radio" name="slot62" tabindex="-1" required>
                            <div class="disc"></div>
                            <input type="radio" name="slot63" tabindex="-1" required>
                            <input type="radio" name="slot63" tabindex="-1" required>
                            <div class="disc"></div>
                            <input type="radio" name="slot64" tabindex="-1" required>
                            <input type="radio" name="slot64" tabindex="-1" required>
                            <div class="disc"></div>
                            <input type="radio" name="slot65" tabindex="-1" required>
                            <input type="radio" name="slot65" tabindex="-1" required>
                            <div class="disc"></div>
                            <input type="radio" name="slot66" tabindex="-1" required>
                            <input type="radio" name="slot66" tabindex="-1" required>
                            <div class="disc"></div>
        
                            <!--Column 6 after-->
                            <div class="column">
                                <input type="radio" name="slot71" tabindex="-1" required>
                                <input type="radio" name="slot71" tabindex="-1" required>
                                <div class="disc"></div>
                                <input type="radio" name="slot72" tabindex="-1" required>
                                <input type="radio" name="slot72" tabindex="-1" required>
                                <div class="disc"></div>
                                <input type="radio" name="slot73" tabindex="-1" required>
                                <input type="radio" name="slot73" tabindex="-1" required>
                                <div class="disc"></div>
                                <input type="radio" name="slot74" tabindex="-1" required>
                                <input type="radio" name="slot74" tabindex="-1" required>
                                <div class="disc"></div>
                                <input type="radio" name="slot75" tabindex="-1" required>
                                <input type="radio" name="slot75" tabindex="-1" required>
                                <div class="disc"></div>
                                <input type="radio" name="slot76" tabindex="-1" required>
                                <input type="radio" name="slot76" tabindex="-1" required>
                                <div class="disc"></div>
        
                                <!--Column 7 after-->
                                <div class="column"></div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div class="front"></div>
            </div>
            <button type="reset">GIOCA DI NUOVO</button>
            </form>
    </section>
</body>
</html>