(() => {
	let props = {};
	let url = 'verify.php';
	let res;

	$(document)
		.on('input', '#name', (e) => {
			$('.res').empty();
			props.name = e.target.value.trim();
			if ((res = fn.isName(props.name)) !== true) {
				delete props.name;
				$('.res').text(res);
			}
		})
		.on('input', '#uname', (e) => {
			$('.res').empty();
			props.uname = e.target.value.trim();
			if ((res = fn.isUsername(props.uname)) !== true) {
				delete props.uname;
				$('.res').text(res);
			}
		})
		.on('input', '#email', (e) => {
			$('.res').empty();
			props.email = e.target.value.trim();
			if ((res = fn.isEmail(props.email)) !== true) {
				delete props.email;
				$('.res').text(res);
			}
		})
		.on('input', '#fpass', (e) => {
			$('.res').empty();
			props.fpass = e.target.value.trim();
			if ((res = fn.isPassword(props.fpass)) !== true) {
				delete props.fpass;
				$('.res').text(res);
			} else if (props.spass && props.spass !== props.fpass) {
				$('.res').text('Passwords does not match.');
			}
		})
		.on('input', '#spass', (e) => {
			$('.res').empty();
			props.spass = e.target.value.trim();
			if ((res = fn.isPassword(props.spass)) !== true) {
				delete props.spass;
				$('.res').text(res);
			} else if (props.fpass && props.fpass !== props.spass) {
				$('.res').text('Passwords does not match.');
			}
		})
		.on('input', '#info', (e) => {
			$('.res').empty();
			props.info = e.target.value.trim();
			if (props.info.length < 4) {
				delete props.info;
				$('.res').text('Invalid username or email');
			}
		})
		.on('input', '#pass', (e) => {
			$('.res').empty();
			props.pass = e.target.value.trim();
			if (props.pass.length < 5) {
				delete props.pass;
				$('.res').text('Password is too short');
			}
		})
		.on('submit', '#signupForm', function (e) {
			e.preventDefault();
			if (props.length < 5) {
				$('.res').text('All the fields are required');
			} else if (props.fpass !== props.spass) {
				$('.res').text('Passwords do not match.');
			} else {
				$('.res').empty();
				props.signup = 'true';
				fn.request(props, 'incs/verify.php')
					.then(function (res) {
						if (fn.isObject(res)) {
							if (res.error) {
								$('.res').text(res.message);
							} else {
								fn.route('member');
							}
						} else {
							$('.res').text(res);
						}
					})
					.catch(function (err) {
						$('.res').text(err);
					});
			}
		})
		.on('submit', '#signinForm', function (e) {
			if (props.length < 2) {
				$('.res').text('All the fields are required');
			} else {
				props.signin = 'true';
				fn.request(props, 'incs/verify.php')
					.then(function (res) {
						if (fn.isObject(res)) {
							if (res.error) {
								$('.res').text(res.message);
							} else {
								fn.route(res.route);
							}
						} else {
							$('.res').text(res);
						}
					})
					.catch(function (err) {
						$('.res').text(err);
					});
			}
		});
})();
