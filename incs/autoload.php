<?php defined("secured") OR die("Direct script access is not allowed");
spl_autoload_register('autoLoad');


function autoLoad($className){
  $path = "../classes/";
  $ext = ".php";
  $fullPath = $path.$className.$ext;
  if(!file_exists($fullPath)){
    $fullPath = $className.".php";
  }
  include_once $fullPath;
}
