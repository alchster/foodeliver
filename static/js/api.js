var apiPath="/api";function apiCall(t,i,o){var e;return t=t.toUpperCase(),i=apiPath+i,"GET"!==t&&(console.log(o),o=JSON.stringify(o||{}),e="application/json; charser=utf-8"),console.log("API call: ["+t+"] "+i+' data: "'+o+'"'),$.ajax({type:t,url:i,data:o,contentType:e,statusCode:{401:function(){window.location="/logout"}}})}$(function(){$(".header__logout .header__menu-link").click(function(){window.location="/logout"}),$(".moderators__list .switch input:checkbox").change(function(t){var i=$(this).closest(".js-moderators-item"),o=$(i).find(".moderators__user-id").html(),e="/"+$(i).find(".moderators__user-type").html();apiCall("PUT",e+"/"+o,"/supplier"===e?{status_code:this.checked?1:0}:{enabled:this.checked})}),$(".moderators__list .moderators__form").submit(function(t){t.preventDefault();var i=$(this).closest(".js-moderators-item"),o=$(i).find(".moderators__user-id").html();apiCall("PUT","/"+$(i).find(".moderators__user-type").html()+"/"+o,{login:$(this).find("input[name=login]").val(),password:$(this).find("input[name=password]").val()})}),$(".moderators__item--add .moderators__btn-create").click(function(t){t.preventDefault();var i=$(this).closest(".moderators__item--add"),o=$(i).find("input[name=description]").val(),e=$(i).find("select[name=Select]").val(),a=$(i).find("input[name=login]").val(),n=$(i).find("input[name=password]").val(),s=$(i).find("input[name=email]").val();""!==o&&apiCall("POST","supplier"===e?"/supplier":"/user",{description:o,login:a,password:n,email:s,admin:"administrator"===e}).then(function(t){window.location=window.location})}),$(".moderators__list .js-moderators-del").click(function(){var t=$(this).closest(".js-moderators-item"),i=$(t).find(".moderators__user-id").html();apiCall("DELETE","/"+$(t).find(".moderators__user-type").html()+"/"+i)})});