<?php defined("secured") OR die("Direct script access is not allowed");

class Profile{

    public static function get($id){
        if(!Check::isID($id)) return "Session for this user has expired";
        $db = new DB;
        if(is_string($conn = $db->connect())) return $conn;
        try {
            if($res = @$conn->query("SELECT NAME, USERNAME FROM PROFILES WHERE USER_ID = '$id'")->fetch(PDO::FETCH_ASSOC)){
                $data = array();
                $data['name'] = Custom::dec($res['NAME']);
                $data['uname'] = Custom::dec($res['USERNAME']);
                return $data;
            }
            return "There is no data for this user";
        } catch (PDOException $e) {
            return "Failed to get profile details";
        }
    }
}