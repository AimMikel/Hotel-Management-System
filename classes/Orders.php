<?php defined("secured") OR die("Direct script access is not allowed");

class Orders{

    public static function add($req, $room, $table){
        $room = Custom::enc($room);
        $table = Custom::enc($table);
        $req = json_decode($req);
        $user_id = $_SESSION['USER_ID'];
        $time = time();
        $similar = md5($user_id.$time.rand());
        
        $db = new DB;
        if(is_string($conn = $db->connect())) return $conn;
        try {
            $conn->beginTransaction();
            foreach ($req as $key => $value) {
                $quantity = $value->quantity;
                $order_id = md5($key.$user_id.$time.rand());
                $food_id = $value->id;
                $conn->exec("INSERT INTO ORDERS VALUES('$order_id', '$user_id', '$food_id', $quantity, '$room', '$table', '$similar', $time, 0)");
            }
            $conn->commit();
            return array();
        } catch (PDOException $e) {
            return "failed to add order. Please try again later.".$e->getMessage();
        }
    }

    public static function getOrders($admin = false){
        $id = null;
        if(!$admin){
            $id = $_SESSION['USER_ID'];
            if(!Check::isID($id)) return "Session for this user has expired. Log in again";
        }elseif(empty($_SESSION['ADMIN'])){
            return "Admin privileges is required. Sign in again.";
        }
        $db = new DB;
        if(is_string($conn = $db->connect())) return $conn;
        try {
            $data = array();
            if($admin){
                $sql = "SELECT F.NAME, F.PRICE, O.USER_ID, O.ORDER_ID, O.QUANTITY, O.ROOM, O.TABLE, O.SIMILAR, O.TIMESTAMP, O.STATUS FROM ORDERS O RIGHT JOIN FOODS F ON F.FOOD_ID = O.FOOD_ID ORDER BY O.TIMESTAMP DESC";
            }else{
                $sql = "SELECT F.NAME, F.PRICE, O.ORDER_ID, O.QUANTITY, O.ROOM, O.TABLE, O.SIMILAR, O.TIMESTAMP, O.STATUS FROM ORDERS O RIGHT JOIN FOODS F ON F.FOOD_ID = O.FOOD_ID WHERE O.USER_ID = '$id' ORDER BY O.TIMESTAMP DESC";
            }
            
            if($res = $conn->query($sql)){
                while($row = $res->fetch(PDO::FETCH_ASSOC)){
                    $info = array();
                    $info['id'] = $row['ORDER_ID'];
                    $info['name'] = Custom::dec($row['NAME']);
                    $info['price'] = intval($row['PRICE']);
                    $info['quantity'] = intval($row['QUANTITY']);
                    $info['room'] = Custom::dec($row['ROOM']);
                    $info['table'] = Custom::dec($row['TABLE']);
                    $info['time'] = intval($row['TIMESTAMP']);
                    $info['status'] = intval($row['STATUS']);
                    $info['similar'] = $row['SIMILAR'];
                    if($admin){
                        $info['user'] = Custom::dec(@$conn->query("SELECT USERNAME FROM PROFILES WHERE USER_ID = '".$row['USER_ID']."'")->fetch(PDO::FETCH_ASSOC)['USERNAME']);
                    }
                    $data[$row['ORDER_ID']] = $info;
                }
            }
            return $data;
        } catch (PDOException $th) {
            return "Failed to get orders. Please try again later";
        }
    }

    public static function approve($id){
        if(empty($_SESSION['ADMIN'])){
            return "Admin privileges is required. Sign in again.";
        }
        if(!Check::isID($id)){
            return "The order you selected does not seem to exist";
        }
        $db = new DB;
        if(is_string($conn = $db->connect())) return $conn;
        try {
            $conn->exec("UPDATE ORDERS SET STATUS = 1 WHERE SIMILAR = '$id'");
            return array();
        } catch (PDOException $th) {
            return "Failed to approve the selected order";
        }
    }
}