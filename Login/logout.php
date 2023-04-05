<?php
session_start();
session_destroy();

header("location: /Progetto/Home/index.php");
exit;

?>