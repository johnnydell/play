var permission = function() {
	var module_funcs = [];
	var user_role_funcs = [];
	
	function init(){
	}
	
	function initModuleFuncs(module_key){
		$.ajax({
			url: manager.root + "/func/getListByModuleKey",
			type: "GET",
			async:false,
			dataType:"json",
			data:{moduleKey:module_key},
			contentType: "application/json",
			success: function(data) {
				module_funcs = data;
			}
		});
	}
	
	function initUserRolesFunc(user_id){
		$.ajax({
			url: manager.root + "/user/getUserRoleFuncsByUserId",
			type: "GET",
			async:false,
			dataType:"json",
			data:{userId:user_id},
			contentType: "application/json",
			success: function(data) {
				user_role_funcs = data;
			}
		});
	}
	
	function load(module_key){
		initModuleFuncs(module_key);
		var user = manager.getLoginUserInfo();
		if(user.user_id != '0'){
			initUserRolesFunc(user.user_id);
		}
		var limits = {};
		$(module_funcs).each(function(i,n){
			var has = false;
			$(user_role_funcs).each(function(j,m){
				if(n.id = m.id){
					has = true;
					return false;
				}
			})
			n.has = has;
			limits[n.funcKey] = n.has;
		})
		return limits;
	}
	
	return {
		init:init,
		load:load
	}
}();
$(document).ready(permission.init);