var apiPath = "/api";

$(function () {
	$('.head-search__box').hide();

	$('.header__logout .header__menu-link').click(function() {
		window.location = '/logout';
	});
	accounts();
	settings();
});


function settings() {
	var oldPassNotMatch = $('.settings__err-old-pass');
	var newPassNotMatch = $('.settings__err-new-pass');
	var id = $('.header__user-id').html();
	var login = $('.header__user-login').html();
	var type = $('.header__user-type').html();
	var oldPass = $('input[name=old-pass]');
	var newPass = $('input[name=new-pass');
	var newPassRep = $('input[name=new-pass-rep]');
	var button = $('.settings__change-pass');

	oldPassNotMatch.hide();
	newPassNotMatch.hide();

	$(oldPass).change(function() {
		var password = oldPass.val();
		apiCall('POST', '/check_password', {id: id, type: type, password: password}).then(function () {
			oldPassNotMatch.hide();
		}, function (e) {
			oldPassNotMatch.show();
		});
	});
	
	var checkNewPass = function(e) {
		var np = newPass.val();
		var npr = newPassRep.val();
		if (np == '' || npr == '') {
			newValid = false;
		} else if (np != npr) {
			newPassNotMatch.show();
		} else {
			newPassNotMatch.hide();
		}
	};

	$([newPass, newPassRep]).each(function() {
		$(this).change(checkNewPass);
	});
	
	$(button).click(function (e) {
		e.preventDefault();
		var pass = oldPass.val();
		var np = newPass.val();
		var npr = newPassRep.val();
		if (pass === '' || np === '' || npr === '' || np !== npr ||
			!oldPassNotMatch.is(':hidden') || !newPassNotMatch.is(':hidden'))
			return;
		apiCall('PUT', '/user/'+id, {password: np}).then(function (data) {
			window.location = window.location;
		});
	});
}

function accounts() {
	$('.moderators__list .switch input:checkbox').change(function(e) {
		var chkbox = this
		var parent = $(this).closest('.js-moderators-item');
		var id = $(parent).find('.moderators__user-id').html();
		var url = '/' + $(parent).find('.moderators__user-type').html();
		var data = url === '/supplier' ? {status_code: this.checked ? 1 : 0} : {enabled: this.checked};
		apiCall('PUT', url + '/' + id, data).then(function () {
			if (url === '/supplier') {
				var status = $(parent).find('.moderators__status');
				status.removeClass(['active', 'blocked'])
					.addClass((["blocked", "", "active"])[data.status_code + 1]);
				status.parent().next().html((["заблокирован", "неактивен", "активен"])[data.status_code + 1]);
			}
		}, function() {
			chkbox.checked = !chkbox.checked;
		});
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
		apiCall('DELETE', url + '/' + id);
	});
}

function apiCall(method, url, data) {
	method = method.toUpperCase();
	url = apiPath + url;
	var ct;
	if (method !== 'GET') {
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
