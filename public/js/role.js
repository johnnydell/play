var role = function(){
	
	var roles = [];
	var deletedRole =[];
	
	function getRoleList(ractive){
		$.ajax({
			url: manager.root + "/role/getList",
			type: "GET",
			dataType: "json",
			beforeSend: function() {
				manager.block();
			},
			success: function(data) {
				roles = data;
				console.log(data);
				$.each(roles,function(i,n){
					n.checked = false;
					n.updated = "0";//0 表示no changes ,1 updated
				});
				ractive.set("roles",roles);
			},
			complete: function() {
				manager.unblock();
			}
		});
	}
	
	function init(){	
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "role", "../../");
				getRoleList(this);
			},
			oncomplete: function(){
				
			}
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
				roles.push(role);
				ractive.update("roles");
			},
			deleteRole:function(){
			      var i = roles.length-1;
			      while (i >= 0){
			        var temp = roles[i];
			        if(temp.checked){
			            if(temp.id != '0'){
			            	deletedRole.push(temp);
			            }
			            funcs.splice(i,1);	
			        }
				  	i--;
				  }		      
			},
			saveRole:function(){
				var error = false;
				$.each(roles,function(i,n){
					if(n.roleName == '' || n.roleDesc == ''){	
						jAlert('please fullfill your fields to commit', 'ERROR');
						error = true;
						return false;
					}
				});	
				var addRoles = [];
				var updateRoles = [];				
				$(roles).each(function(i,n){
					if(n.id == '0'){
						addRoles.push(n);
					} else if(n.updated == '1'){
						updateRoles.push(n);
					}
				});
				console.log(addRoles.length);
				return;
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
						console.log(data);
					},
					complete: function() {
						manager.unblock();
					}
				});				
			},
			viewRoleFunc:function(){
				
			},
			editRoleFunc:function(){
				
			},
			test:function(){
				/*$.ajax({
					url: manager.root + "/city/addCity3",
					type: "POST",
					data:{"id":"123","name":"ccc"}, 
					success: function(data) {
						console.log(data);
					},
					complete: function() {
					}
				});	*/
				/*$.ajax({
					url: manager.root + "/city/addCity4",
					type: "POST",
					contentType: "application/json",  
					dataType: "json",   
	                data: JSON.stringify({"id":"123","name":"ccc"}), 
					success: function(data) {
						console.log(data);
					},
					complete: function() {
					}
				});	*/
			}			
		})
	}
	
	return {
		init:init
	}
}();
$(document).ready(role.init);