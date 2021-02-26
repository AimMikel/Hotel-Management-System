<?php define('secured', TRUE);
require_once('../incs/autoload.php');
Session::start();
if(empty($_SESSION['USER_ID'])){
   header("location:../classes/signout.php");
}
$data = Profile::get($_SESSION['USER_ID']);
if(is_string($data)){
    die($data);
}
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?= $data['name'] ?> | Hotel Management System</title>
		<link rel="stylesheet" href="../css/main.css" />
		<link rel="stylesheet" href="../css/account.css" />
        <script src="../js/jquery-3.4.1.js"></script>
        <script src="../js/axios.js"></script>
        <script src="../js/functions.js"></script>
    </head>
    <body>
        <div class="wrapper">
            <header class="block">
                <div class="inner flex align-center space-between">
                    <h1><?= $data['uname'] ?></h1>
                    <a class="btn" href="../classes/signout.php">Sign Out</a>
                </div>
                <nav class="bg-primary flex align-center space-between">
                    <div class="flex align-center navs">
                        <button class="nav-btn foods" type="button">Foods</button>
                        <button class="nav-btn orders" type="button">My Orders</button>
                    </div>
                    <button class="nav-btn orders-cart flex align-center hide" type="button"><span class="price sp-right rad-md">/=</span><span class="count"></span></button>
                </nav>
            </header>
            
            <div class="main-body">
                <div class="each-page foods-page">
                    <div class="header flex align-center flex-wrap space-between ln-bottom pd-bottom sp-md-bottom">
                        <h3 class="txt-primary">Foods</h3>
                        <input class="ln rad-sm h-30 pd-md-v" type="search" name="searchFood" id="searchFood" placeholder="Search food...">
                    </div>
                    <div class="load flex flex-wrap"></div>
                </div>
                <div class="each-page orders-page hide">
                    <div class="header flex align-center flex-wrap space-between ln-bottom pd-bottom sp-md-bottom">
                        <h3 class="txt-primary">My Orders</h3>
                    </div>
                    <div class="load pd">
                    </div>
                </div>
            </div>
        </div>

        <div class="top-window new-orders hide">
            <div class="inner flex flex-column">
                <div class="header flex align-center space-between h-50 bg-primary txt-alt">
                    <h3 class="pd-md-v">New Orders</h3>
                    <button type="button" class="box-md close-btn" data-elem=".top-window.new-orders">X</button>
                </div>
                <div class="body pd-md">
                    <table class="ln full">
                        <thead class="ln">
                            <tr>
                                <th></th>
                                <th>Food</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="new-orders-load"></tbody>
                        <tfoot>
                            <tr>
                                <th colspan="4">Grand Total</th>
                                <th class="grand-total"></th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <p class="font sm txt-error orders-res pd"></p>
                <div class="footer flex align-center flex-end pd-md ln-top">
                    <section class="flex align-center">
                        <label for="room">Room</label>
                        <select class="input sp-left" name="room" id="room">
                            <option value="Ground Floor">Ground Floor</option>
                            <option value="First Floor">First Floor</option>
                            <option value="Second Floor">Second Floor</option>
                            <option value="Third Floor">Third Floor</option>
                        </select>
                    </section>
                   <section class="flex align-center sp-md-v">
                        <label for="table">Table</label>   
                        <select class="input sp-left" name="table" id="table">
                            <option value="T1">T1</option>
                            <option value="T2">T2</option>
                            <option value="T3">T3</option>
                            <option value="T4">T4</option>
                        </select>
                   </section>
                    
                    <button class="btn" type="button" name="placeOrderBtn" id="placeOrderBtn">Place Order</button>
                </div>
            </div>
        </div>

		<script src="../js/account.js"></script>
    </body>
</html>