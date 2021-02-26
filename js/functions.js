(function (root, factory) {
	root.fn = factory();
})(typeof self !== 'undefined' ? self : this, function () {
	let months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		toString = Object.prototype.toString;

	return {
		isString: function isString(str) {
			return typeof str === 'string';
		},

		isObject: function isObject(v) {
			return v !== null && typeof v === 'object';
		},

		isArray: function isArray(v) {
			return Array.isArray(v) || v instanceof Array;
		},

		isFunction: function isFunction(v) {
			return typeof v === 'function';
		},

		isBool: function isBool(v) {
			return typeof v === 'boolean';
		},

		isDef: function isDef(v) {
			return typeof v !== 'undefined';
		},

		isNull: function isNull(v) {
			return v === null;
		},

		isFile: function isFile(v) {
			return toString.call(v) === '[object File]';
		},

		isBlob: function isBlob(v) {
			return toString.call(v) === '[object Blob]';
		},

		isFormData: function isFormData(obj) {
			return toString.call(obj) === '[object FormData]';
		},

		len: function len(v) {
			if (this.isArray(v)) {
				return v.length;
			} else if (this.isObject(v)) {
				return Object.keys(v).length;
			} else if (this.isString(v)) {
				return v.length;
			}
			return 0;
		},

		isEmpty: function isEmpty(v) {
			if (!this.isDef(v) || this.isNull(v)) {
				return true;
			}
			if (this.len(v) > 0) {
				return false;
			}
			return true;
		},
		includes: function includes(v1, v2) {
			if (!this.isString(v2)) {
				return false;
			}
			v2 = v2.toLowerCase();
			if (this.isString(v1)) {
				v1 = v1.toLowerCase();
				return v1.includes(v2);
			} else if (this.isArray(v1)) {
				for (let i = 0; i < v1.length; i++) {
					if (this.isString(v1[i]) && v1[i].toLowerCase() === v2) {
						return true;
					}
				}
			}
			return false;
		},

		compare: function compare(str1, str2) {
			if (!this.isString(str1) || !this.isString(str2)) return false;
			return str1.toLowerCase() === str2.toLowerCase();
		},

		unshift: function unshift(obj, newProp) {
			if (!this.isObject(newProp)) {
				return null;
			}
			if (!this.isObject(obj)) {
				obj = {};
			}
			for (let prop in obj) {
				newProp[prop] = obj[prop];
			}
			return newProp;
		},

		arrInStr: function arrInStr(str, arr) {
			if (!this.isString(str) || !this.isArray(arr)) return false;
			for (var i = 0; i < arr.length; i++) {
				if (this.isString(arr[i]) && this.includes(str, arr[i])) {
					return true;
				}
			}
			return false;
		},

		arr2str: function arr2str(arr, glue = ',') {
			let res_str = '',
				i = arr.length;
			while (i--) {
				if (res_str === '') {
					res_str += arr[i];
				} else {
					res_str += `${glue}${arr[i]}`;
				}
			}
			return res_str;
		},

		updateArr: function updateArr(arr, newProp) {
			let self = this;
			let updated = [];
			if (!self.isArray(arr)) return [arr, null, newProp];
			if (!self.isArray(newProp)) {
				return [newProp, newProp, null];
			}
			for (let i = 0; i < newProp.length; i++) {
				if (arr.indexOf(newProp[i]) === -1) {
					arr.push(newProp[i]);
					updated.push(newProp[i]);
					newProp.splice(i, 1);
				}
			}
			return [arr, updated, newProp];
		},

		updateObj: function updateObj(obj, props) {
			let self = this,
				updated = false;
			if (self.isEmpty(obj)) {
				return [props, true];
			}
			for (let prop in props) {
				if (self.isDef(obj[prop])) {
					if (self.isArray(obj[prop] && self.isArray(props[prop]))) {
						if (self.len(obj[prop]) === self.len(props[prop])) {
							let tmp = false;
							props.forEach((elem) => {
								if (obj[prop].indexOf(elem) === -1) {
									tmp = true;
								}
							});
							if (tmp) {
								updated = true;
								obj[prop] = props[prop];
							}
						} else {
							updated = true;
							obj[prop] = props[prop];
						}
					} else if (self.isObject(obj[prop]) && self.isObject(props[prop])) {
						let res = self.updateObj(obj[prop], props[prop]);
						obj[prop] = res[0];
						if (res[1]) {
							updated = true;
						}
					} else {
						if (obj[prop] !== props[prop]) {
							obj[prop] = props[prop];
							updated = true;
						}
					}
				} else {
					updated = true;
					obj[prop] = props[prop];
				}
			}
			return [obj, updated];
		},

		reload: function reload() {
			window.location.reload();
		},

		route: function route(url) {
			window.location = url;
		},

		wait: function wait(callback, time = 200) {
			window.setTimeout(callback, time);
		},

		dom: function dom(sel) {
			if (this.isObject(sel)) return sel;
			try {
				return document.querySelector(sel);
			} catch (e) {
				return null;
			}
		},

		doms: function doms(sel) {
			if (this.isArray(sel)) return sel;
			try {
				return document.querySelectorAll(sel);
			} catch (e) {
				return [];
			}
		},

		parent: function parent(elem, level = 1) {
			elem = this.dom(elem);
			while (level--) {
				elem = elem.parentElement;
			}
			return elem;
		},

		pathIncludes: function pathIncludes(elem, needle, level = 1) {
			elem = this.dom(elem);
			if (this.isString(elem.className)) {
				if (elem.className.includes(needle)) return true;
			}
			while (level--) {
				elem = elem.parentElement;
				if (this.isString(elem.className)) {
					if (elem.className.includes(needle)) return true;
				}
			}
			return false;
		},

		html: function html(sel, txt) {
			sel = this.doms(sel);
			if (!this.isEmpty(sel)) {
				if (txt) {
					sel.innerHTML = txt;
				} else {
					return sel.innerHTML;
				}
			} else {
				return null;
			}
		},

		text: function text(sel, txt) {},

		outer: function outer(sel) {
			sel = this.dom(sel);
			if (sel) {
				return sel.outerHTML;
			}
			return null;
		},

		clear: function clear(sel) {
			sel = this.doms(sel);
			if (!this.isEmpty(sel)) {
				sel.forEach((elem) => {
					elem.innerHTML = '';
				});
			}
		},

		bigInt: function bigInt(num) {
			num = num.toString();
			let arr = num.split(''),
				res = '';
			if (arr.length <= 3) {
				return num;
			}
			arr = arr.reverse();
			for (let i = 0; i < arr.length; i++) {
				res = arr[i] + res;
				if (i + 1 < arr.length && (i + 1) % 3 === 0) {
					res = ',' + res;
				}
			}
			return res;
		},

		formatInt: function formatInt(int, len = 2) {
			int = int.toString();
			let _len = int.length;
			let diff = len - _len;
			if (diff > 0) {
				while (diff--) {
					int = `0${int}`;
				}
			}
			return int;
		},

		time: function time(timestamp) {
			timestamp = parseInt(timestamp);
			let d = new Date(timestamp * 1000);
			return `${this.formatInt(d.getHours())}:${this.formatInt(d.getMinutes())}`;
		},

		date: function date(timestamp) {
			timestamp = parseInt(timestamp);
			let t1 = new Date(timestamp * 1000),
				t2 = new Date(),
				res;
			let y1 = t1.getFullYear(),
				y2 = t2.getFullYear(),
				m1 = months[t1.getMonth()],
				m2 = months[t2.getMonth()],
				d1 = t1.getDate(),
				d2 = t2.getDate();
			if (y1 !== y2) {
				return `${this.formatInt(d1)} ${m1}, ${this.formatInt(y1)}`;
			} else {
				if (m1 != m2) {
					return `${this.formatInt(d1)} ${m1}`;
				} else {
					if (d1 === d2) {
						return 'Today';
					} else if (d2 - 1 === d1) {
						return 'Yesterday';
					} else {
						return `${this.formatInt(d1)} ${m1}`;
					}
				}
			}
		},

		elapsed: function elapsed(int) {
			int = parseInt(int);
			let res = 'now',
				now = (new Date().getTime() / 1000).toFixed(0),
				date = new Date(int * 1000);
			let d = date.getDate(),
				m = date.getMonth(),
				y = date.getFullYear();
			if (now > int) {
				let time = now - int;
				if (time >= 29030400) {
					res = `${months[m]} ${this.formatInt(d)}, ${y}`;
				} else if (time >= 86400) {
					res = `${this.formatInt(d)} ${months[m]}`;
				} else if (time >= 3600) {
					res = `${(time / 3600).toFixed(0)}h`;
				} else if (time >= 60) {
					res = `${(time / 60).toFixed(0)}m`;
				} else {
					res = 'now';
				}
			}
			return res;
		},

		request: function request(data, url = 'verify.php') {
			return new Promise(function (resolve, reject) {
				if (!fn.isFormData(data)) {
					let formData = new FormData();
					for (let prop in data) {
						formData.append(prop, data[prop]);
					}
					data = formData;
				}
				axios
					.post(url, data)
					.then(
						function (res) {
							resolve(res.data);
						},
						function (err) {
							reject(err);
						}
					)
					.catch(function (err) {
						reject(err);
					});
			});
		},

		isName: function isName(str) {
			str = str.trim();
			let RE = /^[a-zA-Z ]*$/i;
			if (str === '') {
				return 'Full name is required';
			} else if (str.length < 5) {
				return `Name should be 5 characters minimum.`;
			} else if (str.length > 30) {
				return `Name should be 30 characters maximum.`;
			} else if (!RE.test(str)) {
				return `Name has invalid characters.`;
			} else if (!str.includes(' ')) {
				return `Two or more names are required.`;
			} else {
				return true;
			}
		},

		isUsername: function isUsername(str) {
			str = str.trim();
			let RE = /^[a-z]{2,30}[0-9_]{0,4}$/i;
			if (str === '') {
				return 'Username is required.';
			} else if (str.length < 4) {
				return `Username should be 4 characters minimum.`;
			} else if (str.length > 15) {
				return `Username should be 15 characters maximum.`;
			} else if (!RE.test(str)) {
				return `Username should contain [a-z], [0-9] and _ only.`;
			} else {
				return true;
			}
		},

		isEmail: function isEmail(str) {
			str = str.trim();
			let RE = /^[\w-.+]*[\w-_.]@([\w]+\.)+[\w]+[\w]$/i;
			if (str === '') {
				return `Email address is required.`;
			} else if (str.length < 10) {
				return `Email address is too short.`;
			} else if (str.length > 50) {
				return `Email address should be 50 characters maximum.`;
			} else if (!RE.test(str)) {
				return `Email address is invalid.`;
			} else {
				return true;
			}
		},

		isPassword: function isPassword(str) {
			str = str.trim();
			if (str.length < 5) {
				return 'Password should be 5 characters minimum.';
			} else if (str.length > 30) {
				return 'Password should be 30 characters maximum.';
			} else if (/^[a-z ]*$/i.test(str)) {
				return 'Password cannot contain letters only.';
			} else if (/^[0-9 ]*$/i.test(str)) {
				return 'Password cannot contain numbers only.';
			} else {
				return true;
			}
		},
	};
});

function ImgLoad(img, adj = false) {
	let parent = img.parentNode;
	if (adj) $(parent).css({ height: 'auto' });
	$(img).css({ visibility: 'visible' });
}

function imgAI(img) {
	let parent = img.parentNode;
	let m1 = { w: parent.clientWidth, h: parent.clientHeight },
		m2 = { w: img.clientWidth, h: img.clientHeight };
	if (m1.h > m1.w) {
		if (m2.w > m2.h || m2.w / m2.h > m1.w / m1.h) {
			$(img).css({ visibility: 'visible', height: '100%', width: 'auto' });
		} else {
			$(img).css({ visibility: 'visible', height: 'auto', width: '100%' });
		}
	} else {
		if (m2.w < m2.h || m2.w / m2.h < m1.w / m1.h) {
			$(img).css({ visibility: 'visible', height: 'auto', width: '100%' });
		} else {
			$(img).css({ visibility: 'visible', height: '100%', width: 'auto' });
		}
	}
}
