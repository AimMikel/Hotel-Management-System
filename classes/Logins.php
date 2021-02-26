<?php defined("secured") OR die("Direct script access is not allowed");

class Logins extends Custom{

    public static function signup($name, $uname, $email, $pass){
		if(($res = Check::usernameExist($uname)) !== true) return $res; 
        if(($res = Check::emailExist($email)) !== true) return $res;
        $time = time();
        
        $name = self::enc(ucwords(trim($name)));
        $uname = self::enc(ucwords(trim($uname)));
        $email = self::enc(ucwords(trim($email)));
        $pass = self::hashPass(trim($pass));
        
		$id = md5($uname.$time.rand());
		$db = new DB();
		$res = null;
		if(!is_object($conn = $db->connect())) return $conn;
		try{
			$conn->exec("INSERT INTO PROFILES VALUES('$id','$name','$uname','$email','$pass', $time)");
			Session::stop();
        	Session::start();
            $_SESSION['USER_ID'] = $id;
			$res = true;
		}catch(PDOException $e){
			$res = "There was an error creating a new member.".$e->getMessage();
		}
		return $res;
	}
	
	public static function signin($info, $pass){
		Session::stop();
		Session::start();
		$info = self::enc(ucwords(trim($info)));
		$pass = self::hashPass(trim($pass));
		if($info === "r9mbs+s=" and $pass === "50N.fgSKV8RaA") {
			$_SESSION['ADMIN'] = 'true';
			return "admin";
		};
		$sql = "SELECT USER_ID FROM PROFILES WHERE `USERNAME` = '$info' AND `PASSWORD` = '$pass'";
		$db = new DB();
		$response = "error";
		if(!is_object($conn = $db->connect())) return $conn;
		if($res = $conn->query($sql)){
			if($data = $res->fetch(PDO::FETCH_ASSOC)){
				
                $_SESSION['USER_ID'] = $data['USER_ID'];
                $response = 'member';
			}else{
				$response = "Incorrect details";
			}
		}else{
			$response = "Failed to get user details";
		}
		$conn = null;
		return $response;
	}
    
}