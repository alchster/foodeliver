var apiPath = "/api";

$(function () {
	$('.header__logout .header__menu-link').click(function() {
		window.location = '/logout';
	});

	$('.moderators__list .switch input:checkbox').change(function(e) {
		var parent = $(this).closest('.js-moderators-item');
		var id = $(parent).find('.moderators__user-id').html();
		var url = '/' + $(parent).find('.moderators__user-type').html();
		if (url == "/supplier") {
			data = {status_code: this.checked ? 1 : 0};
		} else {
			data = {enabled: this.checked};
		}
		apiCall('PUT', url + '/' + id, data);
	});

	$('.moderators__list .moderators__form').submit(function(e) {
		e.preventDefault();
		var parent = $(this).closest('.js-moderators-item');
		var id = $(parent).find('.moderators__user-id').html();
		var url = '/' + $(parent).find('.moderators__user-type').html();
		var login = $(this).find("input[name=login]").val();
		var password = $(this).find("input[name=password]").val();
		apiCall('PUT', url + '/' + id, {login: login, password: password});
	});

	$('.moderators__item--add .moderators__btn-create').click(function (e) {
		e.preventDefault();
		var parent = $(this).closest('.moderators__item--add');
		var desc = $(parent).find('input[name=description]').val();
		var role = $(parent).find('select[name=Select]').val();
		var login = $(parent).find('input[name=login]').val();
		var password = $(parent).find('input[name=password]').val();
		var email = $(parent).find('input[name=email]').val();
		var url = role === 'supplier' ? '/supplier' : '/user';
		var admin = role === 'administrator';
		if (desc === '') return;
		var data = {
			description: desc,
			login: login,
			password: password,
			email: email,
			admin: admin,
		};
		apiCall('POST', url, data).then(function(e) {
			window.location = window.location;
		});
	});

	$('.moderators__list .js-moderators-del').click(function () {
		var parent = $(this).closest('.js-moderators-item');
		var id = $(parent).find('.moderators__user-id').html();
		var url = '/' + $(parent).find('.moderators__user-type').html();
		document.api.call('DELETE', url + '/' + id);
	});
});

function apiCall(method, url, data) {
	method = method.toUpperCase();
	url = apiPath + url;
	var ct;
	if (method !== 'GET') {
		console.log(data);
		data = JSON.stringify(data || {});
		ct = 'application/json; charser=utf-8';
	}
	console.log('API call: [' + method + "] " + url + ' data: "' + data + '"');
	return $.ajax({
		type: method,
		url: url,
		data: data,
		contentType: ct,
		statusCode: {
			401: function() { window.location = "/logout"; },
		},
	});
}
