<?php
define("secured", true);
require_once "../incs/autoload.php";

Session::start();
Session::stop();
header("location:../signin.php");

?>