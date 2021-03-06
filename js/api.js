var apiPath = "/api";

$(function () {
  $('.head-search__box').hide();

  $('.header__logout .header__menu-link').click(function() {
    window.location = '/logout';
  });
  accounts();
  settings();
  admin();
  delivery();
  catalog();
  moder();
  supList();
  statistics();
  categories();
  orders();
});


function orders() {
  $('.provider__item-status select').selectmenu({
    change: function () {
      var self = $(this);
      var id = self.closest('.provider__item').find('.provider__item-order-id').html();
      apiCall('PUT', '/order/'+id, {status_code: parseInt(self.val())});
    }
  });
}

function categories() {
  $('.btn.catalog__create-new').click(function () {
    var name = $(this).closest('.catalog__category').find('input').val().trim();
    if (name !== "") {
      apiCall('POST', '/category', {name: name}).done(function () {
        window.location = window.location;
      });
    }
  });
  $('.catalog__btn-edit').click(function () {
    var parent = $(this).closest('.catalog__item');
    var input = parent.find('input');
    if (!parent.hasClass('active-delete')) {
      parent.toggleClass('active-edit');
      if (parent.hasClass('active-edit')) {
        input.removeAttr('disabled');
      } else {
        input.attr('disabled', true);
      }
    }
  });
  $('.catalog__btn-delete, .catalog__btn-delete-cancel').click(function () {
    var parent = $(this).closest('.catalog__item');
    if (!parent.hasClass('active-edit')) {
      parent.toggleClass('active-delete');
    }
  });
  $('.btn.catalog__btn-save').click(function () {
    var parent = $(this).closest('.catalog__item');
    var id = parent.attr('data-cat-id');
    var input = parent.find('input');
    var name = input.val().trim();
    if (name !== "") {
      apiCall('PUT', '/text/'+id, {ru: name, en: name}).done(function () {
        window.location = window.location;
      });
    }
  });
  $('.btn.catalog__btn-delete-accept').click(function () {
    var parent = $(this).closest('.catalog__item');
    var id = parent.attr('data-cat-id');
    apiCall('DELETE', '/category/'+id).done(function() {
      window.location = window.location;
    });
  });
}

function statusChangeUpdate(self) {
  var status = self.find('select').val();
  var opt = self.find('option[value='+status+']');
  self.find('[data-status-total-place]').html(opt.attr('data-status-total'));
  self.find('[data-status-at-period-place]').html(opt.attr('data-status-at-period'));
}

function statistics() {
  $('.datepicker').each(function () {
    var val = $(this).val();
    $(this).datepicker('option', 'dateFormat', 'yy/mm/dd').datepicker('setDate', val);
  });

  var catProdCount = $('#category-counter');
  var catSelect = catProdCount.find('select');
  catProdCount.attr('data-num', catSelect.val());
  catSelect.selectmenu({
    change: function() {
      self = $(this);
      catProdCount.attr('data-num', self.val());
    }
  });

  $('[data-sup-id]').each(function () {
    statusChangeUpdate($(this));
  });
  $('[data-sup-id] select').selectmenu({
    change: function () {
      statusChangeUpdate($(this).closest('[data-sup-id]'));
    }
  });

  var ordersStart = $('#orders-start');
  var ordersEnd = $('#orders-end');
  $('.datepicker').change(function () {
    var self = $(this);
    var item = self.closest('[data-type]');
    var dates = item.find('.datepicker');
    var data = {
      type: item.attr('data-type'),
      start: $(dates[0]).val(),
      end: $(dates[1]).val()
    };
    if ($('.header .header__user-type').html() === 'supplier') {
      data.supplier = $('.header .header__user-id').html();
    }
    apiCall('GET', '/getstat', data).done(function (resp) {
      if (self.is(ordersStart) || self.is(ordersEnd)) {
        $.each(resp.suppliers, function (_, s) {
          var self = $('[data-sup-id='+s.id+']');
          self.find('[data-total-place]').html(s.summary.total);
          self.find('[data-at-period-place]').html(s.summary.at_period);
          self.find('[data-sum-total-place]').html(s.sum_total);
          self.find('[data-sum-at-period-place]').html(s.sum_at_period);
          self.find('[data-charge-total-place]').html(s.charge_total);
          self.find('[data-charge-at-period-place]').html(s.charge_at_period);
          var c = 1;
          $.each(s.by_status, function (id, d) {
            c++;
            var el = self.find('option[value='+id+']');
            el.attr('data-status-total', d.stats.total);
            el.attr('data-status-at-period', d.stats.at_period);
          });
          statusChangeUpdate(self);
        });
        return;
      }
      var els = item.find('.statistic__service-txt');
      $(els[0]).html(resp.total);
      $(els[1]).html(resp.at_period);
    });
  });
}

function supList() {
  $('.suppliers-info__row--status select').selectmenu({
    change: function (e, ui) {
      var parent = $(ui.item.element).closest('.suppliers-info__item');
      var id = parent.find('.suppliers-info__supplier-id').html();
      apiCall('PUT', '/supplier/'+id, {status_code: parseInt(ui.item.value)}).done(function() {
        if (ui.item.value == -1) {
          parent.find('.suppliers-info__tools').show();
        } else {
          parent.find('.suppliers-info__tools').hide();
        }
      });
    },
  });
  
  $('.suppliers-info__item .suppliers-info__editing').click(function () {
    var self = $(this); 
    var itemBox = self.closest('.suppliers-info__item');
    var id = itemBox.find('.suppliers-info__supplier-id').html();
    itemBox.toggleClass('editing');
    if (itemBox.hasClass('editing')) {
      itemBox.find('input').removeAttr('disabled');
      itemBox.find('.suppliers-info__bottom').show();
    } else {
      itemBox.find('input').attr('disabled', true);
      itemBox.find('.suppliers-info__bottom').hide();
    }
    itemBox.find('.suppliers-info__btn').click(function () {
      var data = {
        description: itemBox.find('.suppliers-info__api-name').val() || undefined,
        itn: itemBox.find('.suppliers-info__api-itn').val() || undefined,
        phone: itemBox.find('.suppliers-info__api-phone').val() || undefined,
        email: itemBox.find('.suppliers-info__api-email').val() || undefined,
        address: itemBox.find('.suppliers-info__api-addr').val() || undefined,
        login: itemBox.find('.suppliers-info__api-login').val() || undefined,
        password: itemBox.find('.suppliers-info__api-pass').val() || undefined,
      };
      apiCall('PUT', '/supplier/'+id, data).then(function() {
        self.click();
      });
    });
  });
}

function moder() {
  $('.moderator-catalog__status-select .custom-select-center').each(function() {
    var self = $(this),
    parent = self.closest('.select-center'),
    color = parent.siblings('.js-color'),
    cause = parent.siblings('.js-cause-message'),
    date = parent.siblings('.js-date-not-available');
    self.selectmenu({
      appendTo: parent,
      change: function(event, ui) {
        var val = ui.item.element.data('color');
        var status = ui.item.element.data('status');
        if (status == 'new') {
          color.css('background-color', '#f5a623');
          cause.hide();
          date.hide();
        } else if (status == 'not-available') {
          color.css('background-color', '#9b9b9b');
          cause.hide();
          date.show();
          date.addClass('active');
        } else if (status == 'approved') {
          color.css('background-color', '#7ed321');
          cause.hide();
          date.hide();
        } else if (status == 'not-approved'){
          color.css('background-color', '#ff0033');
          cause.show();
          date.hide();
          cause.addClass('active');
        }
        var id = $(this).closest('.moderator-catalog__item').find('.moderator-catalog__api-product-id').html();
        var data = {
          "status_code": parseInt($(this).val()),
        };
        apiCall('PUT', '/product/'+id, data);
      },
      create: function(event, ui) {
        var status =  $(this).children(':selected').data('status');
        if (status == 'new') {
          color.css('background-color', '#f5a623');
        } else if (status == 'not-available') {
          color.css('background-color', '#9b9b9b');
        } else if (status == 'approved') {
          color.css('background-color', '#7ed321');
        } else if (status == 'not-approved'){
          color.css('background-color', '#ff0033');
        }
      }
    });
  });
  $('.js-save .moderator-catalog__btn').click(function () {
    var parent = $(this).closest('.moderator-catalog__item');
    var id = parent.find('.moderator-catalog__api-product-id').html();
    var text = parent.find('.moderator-catalog__cause textarea').val();
    apiCall('PUT', '/product/'+id, {"status_text": text}).done(function () {
      parent.find('.js-cause-message').hide();
    });
  });

  var filters = {
    'filter-supplier': 'none',
    'filter-category': 'none',
    'filter-status': 'none',
  };
//     '.moderator-catalog__item:has(.moderator-catalog__api-supplier-id:not(contains()))'

  $('.moderator-catalog__select select').selectmenu({
    change: function() {
      self = $(this);
      filters[self[0].id] = self.val();

      $('.moderator-catalog__item').each(function (_, item) {
        var self = $(item);
        var visible = true;
        var vals = {
          'filter-supplier': self.find('.moderator-catalog__api-supplier-id').html(),
          'filter-category': self.find('.moderator-catalog__api-category-id').html(),
          'filter-status': self.find('.custom-select-center').val(),
        };

        $.each(filters, function (fid, val) {
          visible = filters[fid] === 'none' ? true : vals[fid] === filters[fid];
          if (!visible) return false;
        });
        var action = visible ? self.show : self.hide;
        if (!visible)
          self.hide();
        else
          self.show();
        //action();
      });
    }
  });
}

function catalog() {
  $('.provider-catalog__save-btn button').click(function (e) {
    e.preventDefault();
    var parent = $(this).closest('.provider-catalog__add');
    var name = parent.find('.provider-catalog__col-add--info-center .provider-catalog__col-input input:text').val();
    var desc = parent.find('.provider-catalog__col-textarea textarea').val();
    var supId = $('.header__user-id').html();
    var cat = parent.find('.provider-catalog__col-select select').val();
    var cost = parseFloat(parent.find('.provider-catalog__col-add--info-right .provider-catalog__col-input input:text').val());
    var image = parent.find('.provider-catalog__api-img').prop('src').replace(location.origin, '');
    var data = {
      "supplier_id": supId,
      "name": {"en": name, "ru": name},
      "description": {"en": desc, "ru": desc},
      "category_id": cat,
      "cost": cost,
      "image": image
    };
    apiCall('POST', '/product', data).done(function() {
      window.location = window.location;
    });
  });

  $('.provider-catalog__save-catalog button').click(function (e) {
    e.preventDefault();
    var parent = $(this).closest('.provider-catalog__item-card');
    var id = parent.find('.provider-catalog__product-id').html();
    var name = parent.find('.provider-catalog__col--info-center .provider-catalog__name-goods input:text').val();
    var nameId = parent.find('.provider-catalog__name-id').html();
    var desc = parent.find('.provider-catalog__descr .editor').html();
    var descId = parent.find('.provider-catalog__descr-id').html();
    var supId = $('.header__user-id').html();
    var cat = parent.find('.provider-catalog__category-select select').val();
    var cost = parseFloat(parent.find('.provider-catalog__col--info-right .provider-catalog__price-input input:text').val());
    var image = parent.find('.provider-catalog__api-img').prop('src').replace(location.origin, '');
    var data = {
      "supplier_id": supId,
      "category_id": cat,
      "cost": cost,
      "image": image
    };
    apiCall('PUT', '/product/'+id, data).then(function() {
      apiCall('PUT', '/text/'+nameId, {"ru": name});
    }).then(function () {
      apiCall('PUT', '/text/'+descId, {"ru": desc});
    }).done(function() {
      window.location = window.location;
    });
  });

  $('.js-delete-catalog, .provider-catalog__button-cancel').click(function () {
    var parent = $(this).closest('.provider-catalog__item-card');
    parent.children('.provider-catalog__delete-item').toggle();
    parent.find('.js-edit-catalog').toggle();
  });

  $('.provider-catalog__button-delete').click(function () {
    var id = $(this).closest('.provider-catalog__item-card').find('.provider-catalog__product-id').html(); 
    apiCall('DELETE', '/product/'+id).done(function() {
      window.location = window.location;
    });
  });
  
  $('.provider-catalog__btn-file input:file').on('change', function (e) {
    var btn = $(e.target);
    var form = btn.parents('.provider-catalog__api-item');
    var img = form.find('.provider-catalog__api-img');
    var file = btn.prop('files')[0];
    fileUpload(file, img);
  });

  $('[data-category-filter]').click(function () {
    var cat = $(this).attr('data-category-filter');
    $('[data-category]').each(function(_, el) {
      var $el = $(el);
      if (cat === '*' || $el.attr('data-category') === cat) {
        $el.show();
      } else {
        $el.hide();
      }
    });
  });

  function fileUpload(file, img) {
    var data = new FormData();
    data.append('file', file);
    $.ajax({
      method: 'POST',
      enctype: 'multipart/form-data',
      url: '/files',
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 5000
    }).done(function (d) {
      img.prop('src', d.url);
    }, function(e) {
      console.log(e);
    });
  }
}

function delivery() {
  $('.delivery-settings__item .delivery-settings__switch input:checkbox').change(function() {
    var chkbox = this;
    var parent = $(chkbox).closest('.delivery-settings__item');
    var stid = parent.find('.delivery-settings__station-id').html();
    var minAmount = parseFloat(parent.find('.delivery-settings__min-amount input').val());
    var time = parseInt(parent.find('.delivery-settings__time input').val());
    var workingFrom = parent.find('.delivery-settings__api-time-from').val();
    var workingTo = parent.find('.delivery-settings__api-time-to').val();
    var data = {
      "station_id": stid,
      "min_amount": minAmount,
      "delivery_time": time,
      "working_from": workingFrom,
      "working_to": workingTo
    };
    if (chkbox.checked) {
      apiCall('POST', '/supstation', data).fail(function(e) {
        chkbox.checked = !chkbox.checked;
      });
    } else {
      apiCall('DELETE', '/supstation', data).fail(function(e) {
        chkbox.checked = !chkbox.checked;
      });
    }
  });
  $('.delivery-settings__item select').change(function() {
    var parent = $(this).closest('.delivery-settings__item');
    var stid = parent.find('.delivery-settings__station-id').html();
    var minAmount = parseFloat(parent.find('.delivery-settings__min-amount input').val());
    var time = parseInt(parent.find('.delivery-settings__time input').val());
    var workingFrom = parent.find('.delivery-settings__api-time-from').val();
    var workingTo = parent.find('.delivery-settings__api-time-to').val();
    var data = {
      "station_id": stid,
      "min_amount": minAmount,
      "delivery_time": time,
      "working_from": workingFrom,
      "working_to": workingTo
    };
    apiCall('POST', '/supstation', data);
  });
}

function admin() {
  $('.moderators__row .moderators__col--large .js-multiselect').on("select2:select", function (e) {
    var modId = $(this).closest('.moderators__item').find('.moderators__user-id').html();
    apiCall('POST', '/modsupplier', {moderator: modId, supplier: e.params.data.id});
  }).on("select2:unselect", function (e) {
    var modId = $(this).closest('.moderators__item').find('.moderators__user-id').html();
    apiCall('DELETE', '/modsupplier', {moderator: modId, supplier: e.params.data.id});
  });

  $('.admin____stations .item-station__switch input:checkbox').change(function (e) {
    var id = $(this.closest('.item-station')).find('.item-station__id').html();
    var chkbox = this;
    apiCall('PUT', '/station/'+id, {active: this.checked}).fail(function() {
      chkbox.checked = !chkbox.checked;
    });
  });
  $('.admin____trains .item-station__switch input:checkbox').change(function (e) {
    var id = $(this.closest('.item-station')).find('.item-station__id').html();
    var chkbox = this;
    apiCall('PUT', '/train/'+id, {active: this.checked}).fail(function() {
      chkbox.checked = !chkbox.checked;
    });
  });

  var serviceId = $('.admin____service .admin____service-id').html();
  var currentOpt = $('.admin____service select.admin____service-type').val();
  var checkbox = $('.admin____service .admin____service-active input:checkbox')[0];
  if (checkbox)
    checkbox.checked = $('.admin____service .admin____service-' + currentOpt).html() == 'true';

  $('.admin____service select.admin____service-type').selectmenu({
    change: function () {
      currentOpt = $('.admin____service select.admin____service-type').val();
      var checked = $('.admin____service .admin____service-' + currentOpt).html();
      checkbox.checked = checked == 'true';
    },
  });

  $(checkbox).change(function () {
    var data = {};
    data[currentOpt.replace('-', '_')] = checkbox.checked;
    apiCall('PUT', '/service/'+serviceId, data).then(function() {
      $('.admin____service .admin____service-' + currentOpt).html(checkbox.checked);
    }, function() {
      checkbox.checked = !checkbox.checked;
    });
  });
  
  var oldPercent = $('.admin____service .admin____service-percent input').val();
  var oldFixed = $('.admin____service .admin____service-fixed input').val();
  var oldTimeout = $('.admin____service .admin____service-timeout input').val();

  $('.admin____service .admin____service-percent input').change(function (e) {
    e.preventDefault();
    var input = $(this);
    var percent = parseInt(input.val());
    apiCall('PUT', '/service/'+serviceId, {"charge_percent": percent}).then(function() {
      oldPercent = percent;
    }, function() {
      input.val(oldPercent);
    });
  });
  
  $('.admin____service .admin____service-fixed input').change(function (e) {
    e.preventDefault();
    var input = $(this);
    var fixed = parseInt(input.val());
    apiCall('PUT', '/service/'+serviceId, {"charge_fixed": fixed}).then(function() {
      oldFixed = fixed;
    }, function() {
      input.val(oldFixed);
    });
  });

  $('.admin____service .admin____service-timeout input').change(function (e) {
    e.preventDefault();
    var input = $(this);
    var timeout = parseInt(input.val());
    apiCall('PUT', '/service/'+serviceId, {"minutes_for_payment": timeout}).then(function() {
      oldTimeout = timeout;
    }, function() {
      input.val(oldTimeout);
    });
  });
}

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
    var chkbox = this;
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
