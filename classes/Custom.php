<?php defined("secured") OR die("Direct script access is not allowed");

class Custom {

  /**
   * Encrypt the given string using openssl algorithms.
   * @param string $str the string to encrypt.
   * @return false|string encrypted string or false on failure;
   */
  public static function enc($str){
    $str = str_replace("\n", "<br/>", $str);
    $ciphering = "aes-128-ctr";
    $options = 0;
    $key = md5('aimikel');
    $iv = "1212434352121212";
    return openssl_encrypt($str, $ciphering, $key, $options, $iv);
  }
  
  /**
   * Decrypt the given string using openssl algorithms.
   * @param string $str the string to encrypt.
   * @return false|string decrypted string or false on failure.
   */
  public static function dec($str){
    $str = stripslashes($str);
    $str = stripcslashes($str);
    $ciphering = "aes-128-ctr";
    $options = 0;
    $key = md5('aimikel');
    $iv = "1212434352121212";
    return openssl_decrypt($str, $ciphering, $key, $options, $iv);
  }

  /**
   * Encrypts the given string password with a one way hashing algorithm.
   * @param string the password string to encrypt.
   * @param string the encrypted password.
   */
  public static function hashPass($str){
    $salt = md5('aimikel');
    return crypt(md5($str), $salt);
  }

  public static function in_array($needle, $haystack){
    foreach ($haystack as $key => $value) {
      if(strtolower($needle) == strtolower($value)){
        return true;
      }
    }
    return false;
  }


  public static function filter($str){
    $str = htmlspecialchars($str);
    $str = stripslashes($str);
    return $str;
  }

}

?>
