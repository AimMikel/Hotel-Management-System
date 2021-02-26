<?php defined("secured") OR die("Direct script access is not allowed");

class Foods {

    public static function get(){
        $db = new DB;
        if(is_string($conn = $db->connect())) return $conn;
        try {
            $sql = "SELECT * FROM FOODS ORDER BY ADDED_ON DESC";
            $data = array();
            if($res = $conn->query($sql)){
                while ($row = $res->fetch(PDO::FETCH_ASSOC)){
                    $info = array();
                    $info['id'] = $row['FOOD_ID'];
                    $info['name'] = Custom::dec($row['NAME']);
                    $info['description'] = Custom::dec($row['DESCRIPTION']);
                    $info['price'] = doubleval($row['PRICE']);
                    $info['cover'] = Custom::dec($row['COVER']);
                    $info['added'] = intval($row['ADDED_ON']);
                    $data[$row['FOOD_ID']] = $info;
                }
            }
            return $data;
        } catch (PDOException $e) {
            return "There was an error fetching foods data";
        }
    }

    public static function add($name, $desc, $price){
        if(empty($_SESSION['ADMIN'])){
            return "Admin privileges is required. Sign in again.";
        }
        $name = Custom::enc(ucwords(trim($name)));
        $desc = Custom::enc(ucwords(trim($desc)));
        $price = intval(trim($price));
        $time = time();
        $id = md5($time.$name.rand());
        $cover = '';
        
        if(isset($_FILES['cover'])){
            $ext = explode('.', $_FILES['cover']['name']);
            $ext = $ext[count($ext) - 1];
            $cover =  md5($id.rand()).".".$ext;
            if(!move_uploaded_file($_FILES['cover']['tmp_name'], "../assets/cover/".$cover)){
                return "Failed to upload thumbnail image";
            }
        }
        if($cover != ''){
            $cover = Custom::enc($cover);
        }
        $db = new DB;
        if(is_string($conn = $db->connect())) return $conn;
        try {
            $sql = "INSERT INTO FOODS VALUES('$id', '$name', '$desc', $price, $time, '$cover')";
            $conn->exec($sql);
            return array(
                "id" => $id,
                "name" => Custom::dec($name),
                "description" => Custom::dec($desc),
                "price" => intval($price),
                "added" => intval($time),
                "cover" => Custom::dec($cover)
            );
        } catch (PDOException $e) {
            if(!empty($cover)) unlink("../assets/cover/".Custom::dec($cover));
            return "Failed to add food details: ".$e->getMessage();
        }
    }

    public static function remove($id){
        if(empty($_SESSION['ADMIN'])){
            return "Admin privileges is required. Sign in again.";
        }
        if(!Check::isID($id)) return "The food you selected is not valid";
        $db = new DB;
        if(is_string($conn = $db->connect())) return $conn;
        try {
            $sql = "SELECT * FROM FOODS WHERE FOOD_ID = '$id'";
            if($res = $conn->query($sql)->fetch(PDO::FETCH_ASSOC)){
                $conn->exec("DELETE FROM FOODS WHERE FOOD_ID = '$id'");
                if(!empty($res['COVER']) and file_exists("../assets/cover/".Custom::dec($res['COVER']))){
                    unlink("../assets/cover/".Custom::dec($res['COVER']));
                }
                return array();
            }
            return "There is no data to be deleted";
        } catch (PDOException $e) {
            return "Operation failed";
        }
    }

    public static function edit(){
        if(empty($_SESSION['ADMIN'])){
            return "Admin privileges is required. Sign in again.";
        }
        $id = $_POST['id'];
        $name = Custom::enc(ucwords(trim($_POST['name'])));
        $desc = Custom::enc(ucwords(trim($_POST['desc'])));
        $price = intval(trim($_POST['price']));
        $cover = '';
        if(!Check::isID($id)) return "The food you selected is not valid";
        if(isset($_FILES['cover'])){
            $ext = explode('.', $_FILES['cover']['name']);
            $ext = $ext[count($ext) - 1];
            $cover =  md5($id.rand()).".".$ext;
            if(!move_uploaded_file($_FILES['cover']['tmp_name'], "../assets/cover/".$cover)){
                return "Failed to upload thumbnail image";
            }
        }
        if(!empty($cover)){
            $cover = Custom::enc($cover);
        }
        $db = new DB;
        if(is_string($conn = $db->connect())) return $conn;
        try {
            $sql = "SELECT * FROM FOODS WHERE FOOD_ID = '$id'";
            if($res = $conn->query($sql)->fetch(PDO::FETCH_ASSOC)){
                $const = !empty($cover) ? $cover : $res['COVER'];
                $conn->exec("UPDATE FOODS SET NAME = '$name', DESCRIPTION = '$desc', PRICE = $price, COVER = '$const' WHERE FOOD_ID = '$id'");
                if(!empty($cover) && !empty($res['COVER'])){
                    unlink("../assets/cover/".Custom::dec($res['COVER']));
                }
                return array(
                    "id" => $id,
                    "name" => Custom::dec($name),
                    "description" => Custom::dec($desc),
                    "price" => intval($price),
                    "added" => intval($res['ADDED_ON']),
                    "cover" => Custom::dec($const)
                );
            }
            return "There is no data to be edited";
        } catch (PDOException $th) {
            if(!empty($cover) and file_exists("../assets/cover/".Custom::dec($cover))) unlink("../assets/cover/".Custom::dec($cover));
            return "Operation failed";
        }
    }

}