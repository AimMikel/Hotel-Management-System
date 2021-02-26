<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Sign In | Hotel Management System</title>
		<link rel="stylesheet" href="css/main.css" />
		<link rel="stylesheet" href="css/default.css" />
		<script src="js/jquery-3.4.1.js"></script>
		<script src="js/axios.js"></script>
		<script src="js/functions.js"></script>
	</head>
	<body>
		<div class="wrapper ovf-hidden rad-sm">
			<div class="header flex align-center justify-center txt-alt">
				<h2>Sign In</h2>
			</div>
			<form class="body" name="signinForm" id="signinForm" autocomplete="off" onsubmit="return false">
				<div class="inputs pd-lg">
					<input class="input full" type="text" name="info" id="info" minlength="4" maxlength="50" placeholder="Username/Email" required />
					<input class="input full" type="password" name="pass" id="pass" minlength="5" maxlength="30" placeholder="Password" required />
					<p class="block txt-error font-sm sp-md-top res"></p>
				</div>
				<div class="footer pd-lg">
					<button class="button full" type="submit" name="signupBtn" id="signupBtn">Sign In</button>
					<a href="signup.php" class="sp-md-top block">Create account</a>
				</div>
			</form>
		</div>
		<script src="js/default.js"></script>
	</body>
</html>
