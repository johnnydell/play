var role = function(){	
	
	var roles = [];
	function init(){	
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "role", "../../");
				manager.loadProperties(this, "common", "../../");
				refreshRole(this);
			},
			oncomplete: function(){}
		});
		
		ractive.on({
			toShowColumnEditor:function(e){
				var index = $(e.node).parent().parent().attr("lang");
				roles[index].updated = "1";
				$(e.node).hide().next().show().focus();
			},
			toHideColumnEditor:function(e){
				var type = e.node.type;
				if(type == 'select-one'){
					$(e.node).hide().prev().show().text($(e.node).find("option:selected").text());
				} else {
					$(e.node).hide().prev().show().text($(e.node).val());
				}
				var index = $(e.node).parent().parent().attr("lang");
				roles[index].updated = "1";
				ractive.update("roles");
			},
			addRole:function(){				
				var role = {
						id:"0",
						roleName:"",
						roleDesc:"",
						roleFuncs:[],
						active:'1',
						checked:false,
						updated:'0'
				};
				roles.unshift(role);
				ractive.update("roles");
			},
			deleteRole:function(){
				var deletedRole =[];
				var deleteCnt = 0;
				$(roles).each(function(i,n){
					if(n.checked){
						if(n.id != '0'){
							deletedRole.push(n);
						}
						deleteCnt++;
					}
				})
				
				if(deleteCnt > 0){
					if(deletedRole.length > 0){
						$.ajax({
							url: manager.root + "/role/deleteRole",
							type: "POST",
							dataType: "json",
							data:JSON.stringify({deletedRole:deletedRole}),
							contentType: "application/json",    
							beforeSend: function() {
								manager.block();
							},
							success: function(data) {
								var i = roles.length-1;
								while (i >= 0){
								  var temp = roles[i];
								  if(temp.checked){
									  roles.splice(i,1);	
								  }
								  i--;
								}	
								ractive.set("roles",roles);		
								jAlert($.i18n.prop("i18n_delete_ok"), $.i18n.prop("i18n_info"));
							},
							error:function(){
								jAlert($.i18n.prop("i18n_delete_error"), $.i18n.prop("i18n_error"));
							},
							complete: function() {
								manager.unblock();
							}
						});						
					} else {
						var i = roles.length-1;
						while (i >= 0){
						  var temp = roles[i];
						  if(temp.checked){
							  roles.splice(i,1);	
						  }
						  i--;
						}	
						ractive.set("roles",roles);		
						jAlert($.i18n.prop("i18n_delete_ok"), $.i18n.prop("i18n_info"));
					}
				} else {
					jAlert($.i18n.prop("i18n_select_to_delete"), $.i18n.prop("i18n_error"));
				} 
			},
			saveRole:function(){
				var error = false;
				$.each(roles,function(i,n){
					if(n.roleName == '' || n.roleDesc == ''){	
						jAlert($.i18n.prop("i18n_required"), $.i18n.prop("i18n_error"));
						error = true;
						return false;
					}
				});	
				
				if(!error){
					var addRoles = [];
					var updateRoles = [];				
					$(roles).each(function(i,n){
						if(n.id == '0'){
							addRoles.push(n);
						} else if(n.updated == '1'){
							updateRoles.push(n);
						}
					});
					if(addRoles.length > 0 || updateRoles.length > 0){
						$.ajax({
							url: manager.root + "/role/saveRole",
							type: "POST",
							dataType: "json",
							data:JSON.stringify({addRoles:addRoles,updateRoles:updateRoles}),
							contentType: "application/json",    
							beforeSend: function() {
								manager.block();
							},
							success: function(data) {
								refreshRole(ractive);
								jAlert($.i18n.prop("i18n_save_ok"), $.i18n.prop("i18n_info"));
							},
							complete: function() {
								manager.unblock();
							}
						});	
					}
				}							
			},
			viewRoleFunc:function(){
				
			},
			editRoleFunc:function(){
				
			},
			test:function(){
			}			
		})
	}	
	
	//取得当前的角色列表
	function getRoleList(){
		var ret;
		$.ajax({
			url: manager.root + "/role/getList",
			type: "GET",
			async:false,
			dataType: "json",
			contentType: "application/json", 
			success: function(data) {
				ret = data;
			}
		});
		return ret;
	}
	
	function refreshRole(_ractive){
		var data = getRoleList();
		roles = [];
		if(data.length > 0){
			$.each(data,function(i,n){
				n.checked = false;
				n.updated = "0";//0 表示no changes ,1 updated
				roles.push(n);
			});	
		}		
		_ractive.set("roles",roles);
	}
	
	return {
		init:init
	}
}();
$(document).ready(role.init);