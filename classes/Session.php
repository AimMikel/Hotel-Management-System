<?php (strtolower(php_sapi_name()) !== 'cli' AND defined("secured")) OR die("Direct script access is not allowed");

class Session {

	public static function stop(){
		if(version_compare(phpversion(), '5.4.0', '>=')){
			if(session_status() !== PHP_SESSION_NONE){
				session_destroy();
			}
		}else{
			if(session_id() !== ''){
				session_destroy();
			}
		}
	}

	public static function start(){
		if(php_sapi_name() !== "cli"){
		  if(version_compare(phpversion(), '5.4.0', '>=')){
		    if(session_status() === PHP_SESSION_NONE){
		      session_start();
		    }
		  }else{
		    if(session_id() === ''){
		      session_start();
		    }
		  }
		}else{
		  self::stop();
		  die('You cannot start HeroLink sessions in the terminal.');
		}
	}

}

?>
