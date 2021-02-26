<?php define("secured", TRUE); require_once("autoload.php");

header("Content-Type: application/json");

$response = array();
$response['error'] = true;

if(strtoupper($_SERVER['REQUEST_METHOD']) == "POST"){
    if(isset($_POST['signup'])){
        if(isset($_POST['name']) and isset($_POST['uname']) and isset($_POST['email']) and isset($_POST['fpass'])){
			$res = Logins::signup($_POST['name'], $_POST['uname'], $_POST['email'], $_POST['fpass']);
			if($res === true){
				$response['error'] = false;
				$response['message'] = "Account created successful";
			}else{
				$response['message'] = $res;
			}
		}else{
			$response['message'] = "Important fields are missing";
		}
    }elseif(isset($_POST['signin'])){
		if(isset($_POST['info']) and isset($_POST['pass'])){
			$res = Logins::signin($_POST['info'], $_POST['pass']);
			$response['error'] = false;
			if($res === 'admin'){
				$response['message'] = "";
				$response['route'] = 'admin';
			}elseif($res === 'member'){
				$response['message'] = "";
				$response['route'] = 'member';
			}else{
				$response['error'] = true;
				$response['message'] = $res;
			}
		}else{
			$response['message'] = "Important fields are missing";
		}
    }else{
        $response['message'] = "Unknown request";
    }
}else{
	$response['message'] = "Bad request method";
}

echo json_encode($response);