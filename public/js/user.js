var user = function(){	
	var lines = getAllLines();
	var roles = getRolesList();
	var users = [];
	function init(){	
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "user", "../../");
				manager.loadProperties(this, "common", "../../");
				this.set("lines",lines);
				refreshUser(this);
			},oncomplete: function(){}
		});
		
		ractive.on({
			checkAll:function(e){
				$(users).each(function(i,n){
					n.checked = $(e.node).is(':checked');
				});				
				ractive.update("users");
			},
			toShowColumnEditor:function(e){
				var index = $(e.node).parent().parent().attr("lang");
				$(e.node).hide().next().show().focus();
			},
			toHideColumnEditor:function(e){
				var type = e.node.type;
				var index = $(e.node).parent().parent().attr("lang");
				if(type == 'select-one'){
					var colName = $(e.node).attr("colName");
					if(colName != undefined && colName == 'line'){
						var txt = $(e.node).find("option:selected").text();
						users[index]["lineName"]=txt;
						users[index]["lineId"]=$(e.node).find("option:selected").val();
					}
				}
				$(e.node).hide().prev().show();				
				users[index].updated = "1";
				ractive.update("users");
			},
			addUser:function(){				
				var user = {
						id:"0",
						lineId:"",
						lineName:"",
						userName:"",
						password:"",
						userRoles:[],
						active:'1',
						checked:false,
						updated:'0'
				};
				users.unshift(user);
				ractive.update("users");
			},
			deleteUser:function(){
				var deletedUser =[];
				var deleteCnt = 0;
				$(users).each(function(i,n){
					if(n.checked){
						if(n.id != '0'){
							deletedUser.push(n);
						}
						deleteCnt++;
					}
				})
				
				if(deleteCnt > 0){
					if(deletedUser.length > 0){
						$.ajax({
							url: manager.root + "/user/deleteUser",
							type: "POST",
							dataType: "json",
							data:JSON.stringify({deletedUser:deletedUser}),
							contentType: "application/json",    
							beforeSend: function() {
								manager.block();
							},
							success: function(data) {
								var i = users.length-1;
								while (i >= 0){
								  var temp = users[i];
								  if(temp.checked){
									  users.splice(i,1);	
								  }
								  i--;
								}	
								ractive.set("users",users);		
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
						var i = users.length-1;
						while (i >= 0){
						  var temp = users[i];
						  if(temp.checked){
							  users.splice(i,1);	
						  }
						  i--;
						}	
						ractive.set("users",users);		
						jAlert($.i18n.prop("i18n_delete_ok"), $.i18n.prop("i18n_info"));
					}
				} else {
					jAlert($.i18n.prop("i18n_select_to_delete"), $.i18n.prop("i18n_error"));
				} 
			},
			saveUser:function(){
				var error = false;
				$.each(users,function(i,n){
					if(n.userName == '' || n.password == '' || n.lineId == ''){	
						jAlert($.i18n.prop("i18n_required"), $.i18n.prop("i18n_error"));
						error = true;
						return false;
					}
				});	
				
				if(!error){
					var addUsers = [];
					var updateUsers = [];				
					$(users).each(function(i,n){
						if(n.id == '0'){
							addUsers.push(n);
						} else if(n.updated == '1'){
							updateUsers.push(n);
						}
					});
					if(addUsers.length > 0 || updateUsers.length > 0){
						$.ajax({
							url: manager.root + "/user/saveUser",
							type: "POST",
							dataType: "json",
							data:JSON.stringify({addUsers:addUsers,updateUsers:updateUsers}),
							contentType: "application/json",    
							beforeSend: function() {
								manager.block();
							},
							success: function(data) {
								refreshUser(ractive);
								jAlert($.i18n.prop("i18n_save_ok"), $.i18n.prop("i18n_info"));
							},
							complete: function() {
								manager.unblock();
							}
						});	
					}
				}							
			},
			viewUserRole:function(e){
				var userId=$(e.node).attr("lang");
				$(".role_view_popup").show(); 
				$.get(manager.root+"/views/tpl/setting/userRoleView.html", function (data) {
		  	        var ractive_view = new Ractive({
		  	            el: ".role_view_popup",
		  	            template: data,
		  	            data:{root:manager.root},
		  				onrender: function(){
		  					manager.loadProperties(this, "user", "../../");
		  					manager.loadProperties(this, "common", "../../");
		  					refreshRolesData(userId);
		  					this.set("roles",roles);
		  				},
		  	            oncomplete: function (){}
		  	        });
		  	        
		  	      ractive_view.on("close", function () {
		  	            $(".role_view_popup").hide().html("");
		  	        });
		  	    }); 				
			},
			editUserRole:function(e){
				var userId=$(e.node).attr("lang");
				$(".role_edit_popup").show(); 
				$.get(manager.root+"/views/tpl/setting/userRoleEdit.html", function (data) {
		  	        var ractive_edit = new Ractive({
		  	            el: ".role_edit_popup",
		  	            template: data,
		  	            data:{root:manager.root},
		  				onrender: function(){
		  					manager.loadProperties(this, "user", "../../");
		  					manager.loadProperties(this, "common", "../../");
		  					refreshRolesData(userId);
		  					this.set("roles",roles);
		  				},
		  	            oncomplete: function () {}
		  	        });
		  	        
		  	      ractive_edit.on("close", function () {
		  	           $(".role_edit_popup").hide().html("");
		  	      });
		  	      
			  	  ractive_edit.on("save", function () {
		  	          var addUserRoles = [];
		  	          var deletedUserRoles = [];
		  			  $(roles).each(function(j,m){
	  					if(m.checked){
	  						// 需要新增
	  						if(m.user_role_id == '0'){
	  							addUserRoles.push(m);
	  						}
	  					} else {
	  						// 需要删除
	  						if(m.user_role_id != '0'){
	  							deletedUserRoles.push(m);
	  						}
	  					}
		  			  })
		  	          
		  	          if(addUserRoles.length > 0 || deletedUserRoles.length > 0){
		  	        	$.ajax({
							url: manager.root + "/user/saveUserRole",
							type: "POST",
							dataType: "json",
							data:JSON.stringify({userId:userId,addUserRoles:addUserRoles,deletedUserRoles:deletedUserRoles}),
							contentType: "application/json",    
							beforeSend: function() {
								manager.block();
							},
							success: function(data) {
								refreshRolesData(userId);
								jAlert($.i18n.prop("i18n_save_ok"), $.i18n.prop("i18n_info"));
							},
							complete: function() {
								manager.unblock();
							}
						});	
		  	          }
		  	      });
		  	    }); 
				
			},
			changePwd:function(e){
				var userId=$(e.node).attr("lang");
				$(".pwd_edit_popup").show(); 
				$.get(manager.root+"/views/tpl/setting/pwdChange.html", function (data) {
					var pwd = {new_pwd:"",confirm_pwd:""};
		  	        var ractive_pwd_edit = new Ractive({
		  	            el: ".pwd_edit_popup",
		  	            template: data,
		  	            data:{root:manager.root,pwd:pwd},
		  				onrender: function(){
		  					manager.loadProperties(this, "user", "../../");
		  					manager.loadProperties(this, "common", "../../");
		  				},
		  	            oncomplete: function () {}
		  	        });
		  	        
		  	      ractive_pwd_edit.on("close", function () {
		  	           $(".pwd_edit_popup").hide().html("");
		  	      });
		  	      
		  	      ractive_pwd_edit.on("save", function () {
		  	    	  var error = false;
		  	          if(pwd.new_pwd ==''  ||  pwd.confirm_pwd ==''){
		  	        	jAlert($.i18n.prop("i18n_required"), $.i18n.prop("i18n_error"));
						error = true;
						return false;
		  	          }
		  	          
		  	          if(pwd.new_pwd != pwd.confirm_pwd){
		  	        	jAlert($.i18n.prop("i18n_user_pwd_edit_pwd_confirm_not_match"), $.i18n.prop("i18n_error"));
		  	        	error = true;
						return false;
		  	          }
		  	          
		  	          if(!error){
		  	        	$.ajax({
							url: manager.root + "/user/pwdChange",
							type: "POST",
							dataType: "text",
							data:JSON.stringify({userId:userId,newPwd:pwd.new_pwd}),
							contentType: "application/json",    
							beforeSend: function() {
								manager.block();
							},
							success: function(data) {
								jAlert($.i18n.prop("i18n_save_ok"), $.i18n.prop("i18n_info"));
							},
							complete: function() {
								manager.unblock();
							}
						});	
		  	          }
		  	      });
		  	    }); 
			},
			test:function(){
				console.log(users);
			}			
		})
	}	
	
	// 取得当前的用户列表
	function getUserList(){
		var ret;
		$.ajax({
			url: manager.root + "/user/getList",
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
	
	//刷新用户集合
	function refreshUser(_ractive){
		var data = getUserList();
		users = [];
		if(data.length > 0){
			$.each(data,function(i,n){
				n.lineName = n.productLine.lineName;
				n.checked = false;
				n.updated = "0";// 0 表示no changes ,1 updated
				users.push(n);
			});	
		}		
		_ractive.set("users",users);
	}
	
	//取得有效的角色列表
	function getRolesList(){
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
	
	//根据用户取得用户关联角色
	function getUserRolesByUserId(userId){
		var ret;
		$.ajax({
			url: manager.root + "/user/getUserRolesByUserId",
			type: "GET",
			async:false,
			data:{userId:userId},
			dataType: "json",
			contentType: "application/json", 
			success: function(data) {
				ret = data;
			}
		});
		return ret;
	}
	
	//刷新角色选择情况集合
	function refreshRolesData(userId){
		var user_roles = getUserRolesByUserId(userId);
		$(roles).each(function(j,m){
			var checked = false;
			var user_role_id = "0";
			$(user_roles).each(function(k,l){
				if(m.id == l.role.id){
					checked = true;
					user_role_id = l.id;
					return false;
				}
			})
			m.checked = checked;
			m.user_role_id = user_role_id;
		})
	}
	
	//取得所有有效的lines
	function getAllLines(){
		var ret;
		$.ajax({
			url: manager.root + "/line/getActiveList",
			type: "GET",
			async:false,
			dataType:"json",
			contentType: "application/json",
			success: function(data) {
				ret = data;
			}
		});
		return ret;
	}
	
	return {
		init:init
	}
}();
$(document).ready(user.init);
