<?php (strtolower(php_sapi_name()) !== 'cli' AND defined("secured")) OR die("Direct script access is not allowed");

class DB {

  private $host = 'localhost';
  private $user = 'root';
  private $pass = '';
  private $db = 'HOTEL';
  
  /**
   * Connects this application to the database when called.
   * @return string|object returns a mysqli connection object or an error string in case of connection failure.
   */
  public function connect(){
    try{
      $conn = new PDO("mysql:host={$this->host};dbname={$this->db};", $this->user, $this->pass);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      return $conn;
    }catch (PDOException $e){
      return 'Connection to the servers failed';
    }
  }

}

?>
