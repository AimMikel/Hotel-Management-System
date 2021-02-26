<?php define("secured", TRUE); require_once("../incs/autoload.php");
Session::start();
header("Content-Type: application/json");
header("Access-Control-Allow-Orign: http://localhost/hotell");

$response = array();
$response['error'] = true;
$response['message'] = "Unknown request";

if(strtoupper($_SERVER['REQUEST_METHOD']) == "POST"){
    if(isset($_POST['getFoods'])){
        $res = Foods::get();
        if(is_array($res)){
            $response['error'] = false;
            $response['message'] = "Success";
            $response['data'] = $res;
        }else{
            $response['message'] = $res;
        }
    }elseif(isset($_POST['addFood'])){
        $res = Foods::add($_POST['name'], $_POST['desc'], $_POST['price']);
        if(is_array($res)){
            $response['error'] = false;
            $response['message'] = "Success";
            $response['data'] = $res;
        }else{
            $response['message'] = $res;
        }
    }elseif(isset($_POST['removeFood'])){
        $res = Foods::remove($_POST['food']);
        if(is_array($res)){
            $response['error'] = false;
            $response['message'] = "Success";
            $response['data'] = $res;
        }else{
            $response['message'] = $res;
        }
    }elseif(isset($_POST['editFood'])){
        $res = Foods::edit();
        if(is_array($res)){
            $response['error'] = false;
            $response['message'] = "Success";
            $response['data'] = $res;
        }else{
            $response['message'] = $res;
        }
    }elseif(isset($_POST['addOrder'])){
        $res = Orders::add($_POST['data'], $_POST['room'], $_POST['table']);
        if(is_array($res)){
            $response['error'] = false;
            $response['message'] = "Success";
            $response['data'] = $res;
        }else{
            $response['message'] = $res;
        }
    }elseif(isset($_POST['loadOrders'])){
        $res = Orders::getOrders(isset($_POST['admin']));
        if(is_array($res)){
            $response['error'] = false;
            $response['message'] = "Success";
            $response['data'] = $res;
        }else{
            $response['message'] = $res;
        }
    }elseif(isset($_POST['approveOrder'])){
        $res = Orders::approve($_POST['id']);
        if(is_array($res)){
            $response['error'] = false;
            $response['message'] = "Success";
            $response['data'] = $res;
        }else{
            $response['message'] = $res;
        }
    }else{
        $res = "Unknown Request";
    }
}else{
    $response['message'] = "Bad request method.";
}

echo json_encode($response);