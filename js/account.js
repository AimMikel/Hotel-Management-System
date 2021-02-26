((svg, tmp) => {
	let admin = fn.includes(window.location.href, 'admin');

	let states = {},
		f = {},
		c = {},
		foodForm = {},
		newOrders = {};

	function show(elem) {
		$(elem).removeClass('hide');
	}

	function hide(elem) {
		$(elem).addClass('hide');
	}

	function empty(elem) {
		$(elem).empty();
	}

	function remove(elem) {
		$(elem).remove();
	}

	function request(data, url = '../classes/verify.php') {
		if (!fn.isFormData(data)) {
			let formData = new FormData();
			for (let prop in data) {
				formData.append(prop, data[prop]);
			}
			data = formData;
		}
		return new Promise(function (resolve, reject) {
			axios
				.post(url, data)
				.then(function (res) {
					res = res.data;
					if (fn.isString(res)) {
						reject(res);
					} else {
						if (res.error) {
							reject(res.message);
						} else {
							resolve(res.data ? res.data : null);
						}
					}
				}, reject)
				.catch(reject);
		});
	}

	function Component(stateName) {
		states[stateName] = {};
		return {
			update: function update(props, level, unshift) {
				if (fn.isBool(level)) {
					unshift = level;
					level = null;
				}
				let statesUpdated = {};
				if (level && !fn.isDef(states[stateName][level])) {
					states[stateName][level] = props;
					return new Promise(function (resolve, reject) {
						resolve(props);
					});
				} else {
					for (let prop in props) {
						if (level) {
							if (fn.isDef(states[stateName][level])) {
								let res = fn.updateObj(states[stateName][level][prop], props[prop]);
								if (unshift) {
									let tmp = {};
									tmp[prop] = res[0];
									states[stateName][level] = fn.unshift(states[stateName][level], tmp);
								} else {
									states[stateName][level][prop] = res[0];
								}
								if (res[1]) {
									statesUpdated[prop] = res[0];
								}
							} else {
								states[stateName][level] = {};
								states[stateName][level][prop] = props[prop];
								statesUpdated[prop] = props[prop];
							}
						} else {
							let res = fn.updateObj(states[stateName][prop], props[prop]);
							if (unshift) {
								let tmp = {};
								tmp[prop] = res[0];
								states[stateName] = fn.unshift(states[stateName], tmp);
							} else {
								states[stateName][prop] = res[0];
							}
							if (res[1]) {
								statesUpdated[prop] = res[0];
							}
						}
					}
				}
				return new Promise(function (resolve, reject) {
					if (fn.isEmpty(statesUpdated)) {
						reject();
					} else {
						resolve(statesUpdated);
					}
				});
			},

			getState: function getState(fProp, sProp) {
				let thisState = states[stateName];
				if (!fProp) {
					return thisState;
				}
				if (fn.isDef(thisState[fProp])) {
					if (sProp) {
						if (fn.isDef(thisState[fProp][sProp])) {
							return thisState[fProp][sProp];
						}
						return null;
					}
					return thisState[fProp];
				}
				return null;
			},

			deleteState: function deleteState(fProp, sProp) {
				if (sProp) {
					if (states[stateName][fProp] && fn.isDef(states[stateName][fProp][sProp])) {
						delete states[stateName][fProp][sProp];
						return true;
					}
				} else if (fn.isDef(states[stateName][fProp])) {
					delete states[stateName][fProp];
					return true;
				}
				return false;
			},

			stateExist: function stateExist(fProp, sProp) {
				if (fn.isDef(states[stateName][fProp])) {
					if (sProp) {
						if (fn.isDef(states[stateName][fProp][sProp])) {
							return true;
						}
						return false;
					}
					return true;
				}
				return false;
			},
		};
	}

	let img = {
		toBlob: function toBlob(dataurl, callback) {
			let arr = dataurl.split(','),
				mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]),
				n = bstr.length,
				u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			callback(new Blob([u8arr], { type: mime }));
		},

		toDataUrl: function toDataUrl(img, callback) {
			const r = new FileReader();
			r.onload = function (e) {
				callback(e.target.result);
			};
			r.readAsDataURL(img);
		},

		isValid: function isValid(img) {
			if (!fn.isObject(img)) return 'Image is invalid or corrupted';
			if (img.type === 'image/jpg' || img.type === 'image/png' || img.type === 'image/webp' || img.type === 'image/jpeg') {
				if (img.size > 1024 * 1024 * 10) {
					return 'The image you selected is greater than the maximum size of 10 MB';
				}
				return true;
			}
			return 'The image you selected is not supported.';
		},
	};

	/**
	 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	 */

	c.foods = new Component('foods');
	f.foods = {
		load: function load() {
			let self = this;
			let foods = c.foods.getState();
			let elem = '.foods-page .load';
			if (fn.isEmpty(foods)) {
				$(elem).html(svg.spinner);
				request({ getFoods: 'true' })
					.then(function (data) {
						if (fn.isEmpty(data)) {
							$(elem).html(`<p class="pd-md txt-center">There are no foods to display yet.</p>`);
						} else {
							c.foods.update(data).then(function (foods) {
								empty(elem);
								for (let food in foods) {
									self.render(foods[food]);
								}
							});
						}
					})
					.catch(function (err) {
						console.log(err);
					});
			} else {
				empty(elem);
				for (let food in foods) {
					self.render(foods[food]);
				}
			}
		},

		remove: function remove(id) {
			let res = confirm('Are you sure you want to permanently remove this food?');
			if (!res) return;
			request({ removeFood: 'true', food: id })
				.then(function (data) {
					delete states.foods[id];
					f.foods.load();
				})
				.catch(function (err) {
					alert(err);
				});
		},
		edit: function edit(id) {
			let data = c.foods.getState(id);
			foodForm.action = 'edit';
			foodForm.id = id;
			$('.add-food .title').text('Edit Food');
			$('#f-name').val(data.name);
			$('#f-price').val(data.price);
			$('#f-desc').val(data.description);
			if (!fn.isEmpty(data.cover)) {
				$('#addFoodForm').css('background-image', `url(../assets/cover/${data.cover})`);
			}
			show('.top-window.add-food');
		},
		search: function search(str) {
			let foods = c.foods.getState();
			let found = [];
			let self = this;
			let elem = '.foods-page .load';
			if (fn.isEmpty(foods)) return;
			if (fn.isEmpty(str)) {
				empty(elem);
				for (let prop in foods) {
					self.render(foods[prop]);
				}
				return;
			}
			for (let prop in foods) {
				let food = foods[prop];
				if (fn.includes(food.name, str) || fn.includes(food.description, str) || fn.includes(String.valueOf(food.price), str)) {
					found.push(food);
				}
			}
			empty(elem);
			if (fn.len(found) > 0) {
				found.forEach((food) => {
					self.render(food);
				});
			} else {
				$(elem).html(`<p class="pd-md txt-center full">We didn't found any food that matched what you searched for.</p>`);
			}
		},
		render: function render(props) {
			$('.foods-page .load').append(tmp.food(props, admin));
		},
	};

	/**
	 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	 */

	c.orders = new Component('orders');
	f.orders = {
		loadOrders: function loadOrders(admin = false) {
			let self = this;
			let elem = '.orders-page .load';
			let req = {};
			req.loadOrders = 'true';
			if (admin) {
				req.admin = 'true';
			}
			request(req)
				.then(function (data) {
					if (fn.isEmpty(data)) {
						$(elem).html(`<p class="pd-md">There are no orders made for this account yet</p>`);
					} else {
						empty(elem);
						let group = {},
							similar = null;
						for (let prop in data) {
							if (similar !== null && similar !== data[prop].similar) {
								self.renderOrders(group);
								group = {};
							}
							similar = data[prop].similar;
							group[prop] = data[prop];
						}
						self.renderOrders(group);
					}
				})
				.catch(function (err) {
					$(elem).html(`<p class="pd-md">${err}</p>`);
				});
		},
		add: function add(id, inc = true) {
			if (inc) {
				if (fn.isEmpty(newOrders[id])) {
					newOrders[id] = {
						id: id,
						quantity: 1,
					};
				} else {
					newOrders[id].quantity += 1;
				}
			} else {
				if (newOrders[id].quantity == 1) {
					delete newOrders[id];
					$(`.${id}.each-food`).removeClass('added');
				} else {
					newOrders[id].quantity -= 1;
				}
			}
			let { total, sum } = this.findTotal();
			$('.nav-btn.orders-cart .price').text(`${total}/=`);
			if (fn.len(newOrders) > 0) {
				$('.nav-btn.orders-cart .count').text(sum);
				show('.nav-btn.orders-cart');
			} else {
				hide('.nav-btn.orders-cart');
			}
		},

		findTotal: function findTotal() {
			if (fn.len(newOrders) == 0) return { total: 0, sum: 0 };
			let total = 0;
			let sum = 0;
			for (let prop in newOrders) {
				let price = c.foods.getState(prop, 'price');
				total += price * newOrders[prop].quantity;
				sum += newOrders[prop].quantity;
			}
			return { total, sum };
		},
		showMyOrders: function showMyOrders() {
			let self = this,
				pos = 1;
			let { total, sum } = this.findTotal();
			empty('.new-orders-load');
			if (fn.len(newOrders) == 0) {
				hide('.top-window.new-orders');
				return;
			}
			for (let prop in newOrders) {
				let data = newOrders[prop];
				let food = c.foods.getState(prop);
				food.pos = pos;
				food.quantity = newOrders[prop].quantity;
				self.renderMyOrder(food);
				pos += 1;
			}
			$('.grand-total').text(`${total}/=`);
			show('.top-window.new-orders');
		},
		renderMyOrder: function renderMyOrder(props) {
			$('.new-orders-load').append(tmp.myOrder(props));
		},
		renderOrders: function renderOrders(props) {
			$('.orders-page .load').append(tmp.orders(props, admin));
		},
	};

	/**
	 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	 */

	f.foods.load();
	if (admin) {
		f.orders.loadOrders(true);
	} else {
		f.orders.loadOrders();
	}

	$(document)
		.on('click', '.close-btn', function (e) {
			hide($(this).attr('data-elem'));
		})
		.on('click', '.show-btn', function (e) {
			show($(this).attr('data-elem'));
		})
		.on('click', '.nav-btn.add-food', function (e) {
			if (foodForm.action && foodForm.action !== 'new') {
				foodForm = {};
				$('.add-food .title').text('Add Food');
				empty('.food-res');
				fn.dom('#addFoodForm').reset();
				$('#addFoodForm').css('background-image', 'none');
			}
			foodForm.action = 'new';
			show('.top-window.add-food');
		})
		.on('input', '#foodCover', function (e) {
			let file = this.files[0];
			let res = img.isValid(file);
			if (res === true) {
				img.toDataUrl(file, function (url) {
					$('#addFoodForm').css('background-image', `url(${url})`);
					empty('.food-res');
					foodForm.cover = file;
				});
			} else {
				$('.food-res').text(res);
			}
		})
		.on('submit', '#addFoodForm', function (e) {
			e.preventDefault();
			if (foodForm.action == 'new' && !foodForm.cover) {
				$('.food-res').text('Cover image for this food is required.');
				return;
			}
			foodForm.name = this['f-name'].value;
			foodForm.price = this['f-price'].value;
			foodForm.desc = this['f-desc'].value;
			if (foodForm.action == 'new') {
				foodForm.addFood = 'true';
			} else {
				foodForm.editFood = 'true';
			}
			request(foodForm)
				.then(function (data) {
					hide('.top-window.add-food');
					empty('.food-res');
					fn.dom('#addFoodForm').reset();
					$('#addFoodForm').css('background-image', 'none');
					let info = {};
					info[data.id] = data;
					c.foods.update(info, foodForm.action === 'new').then(function (props) {
						f.foods.load();
					});
					foodForm = {};
				})
				.catch(function (err) {
					$('.food-res').text(err);
				});
		})
		.on('click', '.each-food', function (e) {
			let id = this.classList[0];
			if (fn.pathIncludes(e.target, 'remove-btn')) {
				f.foods.remove(id);
			} else if (fn.pathIncludes(e.target, 'edit-btn')) {
				f.foods.edit(id);
			} else if (fn.pathIncludes(e.target, 'add-btn')) {
				$(this).addClass('added');
				f.orders.add(id);
			}
		})
		.on('input', '#searchFood', function (e) {
			f.foods.search(this.value.trim());
		})
		.on('click', '.nav-btn.orders-cart', function (e) {
			if (fn.len(newOrders) == 0) return;
			f.orders.showMyOrders();
		})
		.on('click', '.each-my-order', function (e) {
			let id = this.classList[0];
			if (fn.pathIncludes(e.target, 'inc-btn')) {
				f.orders.add(id);
				f.orders.showMyOrders();
			} else if (fn.pathIncludes(e.target, 'dec-btn')) {
				f.orders.add(id, false);
				f.orders.showMyOrders();
			}
		})
		.on('click', '#placeOrderBtn', function (e) {
			if (fn.len(newOrders) == 0) return;
			request({
				addOrder: 'true',
				room: $('#room').val(),
				table: $('#table').val(),
				data: JSON.stringify(newOrders),
			})
				.then(function (data) {
					newOrders = {};
					empty('.orders-res');
					hide('.nav-btn.orders-cart');
					hide('.top-window.new-orders');
					$('.each-food').removeClass('added');
					alert('Your order was placed. Wait for your food');
				})
				.catch(function (err) {
					$('.orders-res').text(err);
				});
		})
		.on('click', '.nav-btn.foods', function () {
			hide('.each-page');
			show('.each-page.foods-page');
		})
		.on('click', '.nav-btn.orders', function () {
			hide('.each-page');
			show('.each-page.orders-page');
		})
		.on('click', '.orders-group', function (e) {
			let id = this.classList[0];
			if (fn.pathIncludes(e.target, 'approve-btn')) {
				request({ approveOrder: 'true', id: id })
					.then(function (data) {
						remove(`.${id}.orders-group .approve-btn`);
					})
					.catch(function (err) {
						alert(err);
					});
			}
		});

	fn.dom('.wrapper').addEventListener(
		'scroll',
		function (e) {
			if (this.scrollTop >= 120) {
				$('header nav').addClass('fixed');
			} else {
				$('header nav').removeClass('fixed');
			}
		},
		false
	);

})(
	{
		spinner: '<svg width="38" height="38" class="spinner spins" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="4"><circle stroke-opacity=".2" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg>',
		sm_spinner: '<svg width="38" height="38" class="sm-spinner spins" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="4"><circle stroke-opacity=".2" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg>',
		btn_spinner: '<svg width="38" height="38" class="btn-spinner spins" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="4"><circle stroke-opacity=".2" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/></path></g></g></svg>',
	},
	{
		food: function food(props, admin) {
			return `<div class="${props.id} each-food flex flex-column space-between rad-sm" style="background-image: url(../assets/cover/${props.cover})">
						<div class="header flex align-center flex-end pd">
						${
							admin
								? `
									<button class="edit-food txt-error ln-error ln pd-xs rad remove-btn">remove</button>
									<button class="edit-food sp-left ln pd-xs rad pd-md-v txt-primary edit-btn">edit</button>`
								: `<button class="btn add-btn txt-primary ln font-bold font-lg">+</button>`
						}
							
						</div>
						<div class="footer flex flex-column pd">
							<section class="flex align-center space-between sp-bottom">
								<h4 class="f-name ellipsis">${props.name}</h4>
								<span class="f-price txt-primary font-sm ">${props.price}/=</span>
							</section>
							<p class="f-desc font-sm ellipsis">${props.description}</p>
						</div>
					</div>`;
		},
		myOrder: function myOrder(props) {
			return `<tr class="${props.id} each-my-order">
						<td>${props.pos}</td>
						<td>
							<h4 class="ellipsis">${props.name}</h4>
							<p class="ellipsis font-sm">${props.description}</p>
						</td>
						<td class="o-quantity">${props.quantity}</td>
						<td class="o-price ellipsis">${props.price} /=</td>
						<td class="o-total ellipsis">${props.price * props.quantity} /=</td>
						<td class="ellipsis">
							<button type="button" class="btn box-sm dec-btn">-</button>
							<button type="button" class="btn box-sm inc-btn">+</button>
						</td>
					</tr>
			`;
		},
		orders: function orders(props, admin) {
			let user,
				time,
				room,
				table,
				status,
				total = 0,
				pos = 1,
				similar,
				l_str = '';
			for (let prop in props) {
				let order = props[prop];
				time = order.time;
				room = order.room;
				table = order.table;
				status = order.status;
				similar = order.similar;
				total += order.quantity * order.price;
				if (admin) {
					user = order.user;
				}
				l_str += `<tr>
							<td>${pos}</td>
							<td class="ellipsis">${order.name}</td>
							<td>${order.quantity}</td>
							<td class="ellipsis">${order.price} /=</td>
							<td class="ellipsis">${order.price * order.quantity} /=</td>
						</tr>`;
				pos += 1;
			}

			let h_str = `<div class="${similar} orders-group rad full">
							<div class="header flex align-center space-between pd ln-bottom">
								${admin ? `<h4>${user}</h4>` : ''}
								<p class="txt-sm">${fn.date(time)} - ${fn.time(time)}</p>
								${!admin ? `<i class="${status == 0 ? 'txt-fade' : 'txt-primary'}">${status == 0 ? 'Pending' : 'Approved'}</i>` : ''}
                            </div>
                            <div class="pd">
                                <table class="full ">
                                    <thead class="">
                                        <tr>
                                            <th></th>
                                            <th>Food</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>`;
			let f_str = `			</tbody>
                                    <tfoot>
                                        <tr>
                                            <th colspan="4">Grand Total</th>
                                            <th class="ellipsis">${total} /=</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div class="footer pd flex align-center flex-end ln-top">
								<span class="sp-right">${room} - ${table}</span>
								${admin && status == 0 ? `<button class="btn approve-btn" type="button">Approve</button>` : ''}
                            </div>
						</div>`;
			return h_str + l_str + f_str;
		},
	}
);
