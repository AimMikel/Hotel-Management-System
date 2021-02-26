<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Sign Up | Hotel Management System</title>
		<link rel="stylesheet" href="css/main.css" />
		<link rel="stylesheet" href="css/default.css" />
		<script src="js/jquery-3.4.1.js"></script>
		<script src="js/axios.js"></script>
		<script src="js/functions.js"></script>
	</head>
	<body>
		<div class="wrapper ovf-hidden rad-sm">
			<div class="header flex align-center justify-center txt-alt">
				<h2>Create Account</h2>
			</div>
			<form class="body" name="signupForm" id="signupForm" autocomplete="off" onsubmit="return false">
				<div class="inputs pd-lg">
					<input class="input full" type="text" name="name" id="name" minlength="5" maxlength="30" placeholder="Full Name" required />
					<input class="input full" type="text" name="uname" id="uname" minlength="4" maxlength="15" placeholder="Username" required />
					<input class="input full" type="email" name="email" id="email" minlength="10" maxlength="50" placeholder="Email Address" required />
					<input class="input full" type="password" name="fpass" id="fpass" minlength="5" maxlength="30" placeholder="Create Password" required />
					<input class="input full" type="password" name="spass" id="spass" minlength="5" maxlength="30" placeholder="Confirm Password" required />
					<p class="block txt-error font-sm sp-md-top res"></p>
				</div>
				<div class="footer pd-lg">
					<button class="button full" type="submit" name="signupBtn" id="signupBtn">Create Account</button>
					<a href="signin.php" class="sp-md-top block">Sign In</a>
				</div>
			</form>
		</div>
		<script src="js/default.js"></script>
	</body>
</html>
