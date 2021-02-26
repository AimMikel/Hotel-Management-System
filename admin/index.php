<?php define('secured', TRUE);
require_once('../incs/autoload.php');
Session::start();
if(empty($_SESSION['ADMIN'])){
   header("location:../classes/signout.php");
}
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin | Hotel Management System</title>
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
                    <h1>Admin Panel</h1>
                    <a class="btn" href="../classes/signout.php">Sign Out</a>
                </div>
                <nav class="bg-primary flex align-center space-between">
                    <div class="flex align-center navs">
                        <button class="nav-btn foods" type="button">Foods</button>
                        <button class="nav-btn add-food" type="button">Add Food</button>
                        <button class="nav-btn orders" type="button">Orders<span></span></button>
                    </div>
                    <button></button>
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
                    <div class="header"></div>
                    <div class="load"></div>
                </div>
                <div class="each-page members-page hide">
                    <div class="header"></div>
                    <div class="load"></div>
                </div>
            </div>
        </div>

        <div class="top-window add-food hide">
            <div class="inner flex flex-column">
                <div class="header flex align-center space-between h-50 bg-primary txt-alt">
                    <h3 class="pd-md-v title">Add Food</h3>
                    <button type="button" class="box-md close-btn font-bold font-lg" data-elem=".top-window.add-food">X</button>
                </div>
                <form class="flex flex-column grow space-between" name="addFoodForm" id="addFoodForm" method="post" onsubmit="return false" autocomplete="off">
                    <div class="flex align-center pd flex-end">
                        <button class="btn h-30" type="submit" name="addFoodBtn" id="addFoodBtn">Save</button>
                    </div>
                    <section class="flex align-center justify-center">
                        <button class="pd rad txt-primary ln" type="button" onclick="$('#foodCover').click()" title="Cover Picture">Upload Cover</button>
                        <input type="file" name="foodCover" id="foodCover" class="hide">
                    </section>
                    <div class="pd-md footer">
                        <section class="flex align-center space-between sp-bottom">
                            <input class="input sp-right flex-grow" type="text" name="f-name" id="f-name" minlength="2" maxlength="30" placeholder="Name" required>
                            <input class="input flex-grow" type="number" name="f-price" id="f-price" min="1" placeholder="Price" required>
                        </section>
                        <textarea class="input" name="f-desc" id="f-desc" cols="30" rows="10" minlength="5" maxlength="100" placeholder="Description" required></textarea>
                        <p class="food-res txt-error font-sm"></p>
                    </div>
                </form>
            </div>
        </div>


		<script src="../js/account.js"></script>
    </body>
</html>