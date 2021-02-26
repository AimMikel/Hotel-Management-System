<?php defined("secured") OR die("Direct script access is not allowed");

class Check {

	/**
	 * Checks whether a given string is an ID;
	 * @param string $str the string to check if is an ID.
	 * @return bool returns true if the given string is an id otherwise false;
	 */
	public static function isID($str){
		if($str === null || strlen($str) !== 32){
			return false;
		}elseif(!preg_match("/^[a-z0-9]*$/", $str)){
			return false;
		}
		return true;
	}

  
  /**
   * Check whether the given string is a valid username.
   * @param string $name the string to check.
   * @return bool|string returns true if the given string is a valid username otherwise a result message.
   */
	public static function isUsername($name){
		$name = trim($name);
        if(strlen($name) < 4){
            return "Username should be 4 characters minimum.";
        }elseif(strlen($name) > 15){
            return "Username should be 15 characters maximum.";
        }elseif(!preg_match("/^[a-zA-Z]{2,15}[0-9_]{0,4}$/", $name)){
            return "Username should contain [a-z], [0-9] and _ only.";
        }
		return true;
	}
  
  /**
   * Check whether the given username is valid and exists in the database.
   * @param string $name the username to check.
   * @return bool|string returns true if the username is not available otherwise a result message.
   */
	public static function usernameExist($name){
		if(($res = self::isUsername($name)) !== true) return $res;
		$name = Custom::enc(ucwords(trim($name)));
		$sql = "SELECT USERNAME FROM PROFILES WHERE USERNAME = '$name'";
		$db = new DB();
		if(!is_object($conn = $db->connect())) return $conn;
		if($res = $conn->query($sql)){
			$conn = null;
			if(is_array($data = $res->fetch(PDO::FETCH_ASSOC))){
				return "Username is not available. Please try another one.";
			}
			return true;
        }
        return "Failed to validate username. Please try again later.";
    }
    
    public static function isEmail($email){
		$email = trim($email);
		if(strlen($email) < 10){
			return "Email address is too short.";
		}elseif(strlen($email) > 50){
			return "Email address should be 50 characters maximum.";
		}elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
			return "Email address is invalid.";
		}
		return true;
    }
    
    public static function emailExist($email){
		if(($res = self::isEmail($email)) !== true){
			return $res;
		}
		$email = Custom::enc(ucwords(trim($email)));
		$sql = "SELECT EMAIL FROM PROFILES WHERE EMAIL = '$email'";
		$db = new DB;
		if(is_object($conn = $db->connect())){
			if($res = $conn->query($sql)){
				if($data = $res->fetch()){
					return "Email address is not available. Please try another one.";
                }
                return true;
            }
            return "Failed to validate email address. Please try again later.";
        }
        return $conn;
	}
  
  /**
   * Checks whether the given string is a valid password.
   * @param string $pass the string to check if is a valid password.
   * @return bool|string returns true if the given string is a valid password otherwise a result message.
   */
	public static function isPassword($pass){
		$pass = trim($pass);
		if(strlen($pass) < 6){
			return "Password should be 6 characters minimum";
		}elseif(strlen($pass) > 30){
			return "Password should be 30 characters maximum";
		}elseif(preg_match("/^[a-zA-Z ]*$/", $pass)){
			return "Password cannot contain letters only.";
		}elseif(preg_match("/^[0-9 ]*$/", $pass)){
			return "Password cannot contain numbers only";
		}
		return true;
	}

}
