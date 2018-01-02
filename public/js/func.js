var func = function(){
	
	var funcs = [];
	var modules = getModuleList();
	function init(){	
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "func", "../../");
				manager.loadProperties(this, "common", "../../");
				this.set("modules",modules);
				refreshFunc(this);
			},
			oncomplete: function(){}
		});
		
		ractive.on({
			toShowColumnEditor:function(e){
				var index = $(e.node).parent().parent().attr("lang");
				$(e.node).hide().next().show().focus();
			},
			toHideColumnEditor:function(e){
				var type = e.node.type;
				var index = $(e.node).parent().parent().attr("lang");
				if(type == 'select-one'){
					var txt = $(e.node).find("option:selected").text();
					var colName = $(e.node).attr("colName");
					if(colName == 'module'){
						funcs[index].moduleName = txt;
					}
				}
				$(e.node).hide().prev().show();
				funcs[index].updated = "1";
				ractive.update("funcs");
			},
			addFunc:function(){				
				var func = {
						id:"0",
						moduleId:"",
						moduleName:"",
						funcKey:"",
						funcName:"",
						active:'1',
						checked:false,
						updated:'0'
				};
				funcs.unshift(func);
				ractive.update("funcs");
			},
			deleteFunc:function(){
				var deletedFunc =[];
				var deleteCnt = 0;
				$(funcs).each(function(i,n){
					if(n.checked){
						if(n.id != '0'){
							deletedFunc.push(n);
						}
						deleteCnt++;
					}
				})
				
				if(deleteCnt > 0){
					if(deletedFunc.length > 0){
						$.ajax({
							url: manager.root + "/func/deleteFunc",
							type: "POST",
							dataType: "json",
							data:JSON.stringify({deletedFunc:deletedFunc}),
							contentType: "application/json",    
							beforeSend: function() {
								manager.block();
							},
							success: function(data) {
								var i = funcs.length-1;
								while (i >= 0){
								  var temp = funcs[i];
								  if(temp.checked){
									  funcs.splice(i,1);	
								  }
								  i--;
								}	
								ractive.set("funcs",funcs);		
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
						var i = funcs.length-1;
						while (i >= 0){
						  var temp = funcs[i];
						  if(temp.checked){
							  funcs.splice(i,1);	
						  }
						  i--;
						}	
						ractive.set("funcs",funcs);		
						jAlert($.i18n.prop("i18n_delete_ok"), $.i18n.prop("i18n_info"));
					}
				} else {
					jAlert($.i18n.prop("i18n_select_to_delete"), $.i18n.prop("i18n_error"));
				} 	      
			},
			saveFunc:function(){
				var error = false;
				$.each(funcs,function(i,n){
					if(n.moduleId == ''||n.funcKey == '' || n.funcName == ''){	
						jAlert($.i18n.prop("i18n_required"), $.i18n.prop("i18n_error"));
						error = true;
						return false;
					}
				});	
				
				if(!error){
					var addFuncs = [];
					var updateFuncs = [];				
					$(funcs).each(function(i,n){
						if(n.id == '0'){
							addFuncs.push(n);
						} else if(n.updated == '1'){
							updateFuncs.push(n);
						}
					});
					if(addFuncs.length > 0 || updateFuncs.length > 0){
						$.ajax({
							url: manager.root + "/func/saveFunc",
							type: "POST",
							dataType: "json",
							data:JSON.stringify({addFuncs:addFuncs,updateFuncs:updateFuncs}),
							contentType: "application/json",    
							beforeSend: function() {
								manager.block();
							},
							success: function(data) {
								refreshFunc(ractive);
								jAlert($.i18n.prop("i18n_save_ok"), $.i18n.prop("i18n_info"));
							},
							complete: function() {
								manager.unblock();
							}
						});	
					}
				}	
			},
			test:function(){
			}			
		})
	}
	
	//取得有效的功能清单
	function getFuncList(){
		var ret;
		$.ajax({
			url: manager.root + "/func/getList",
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
	
	function refreshFunc(_ractive){
		var data = getFuncList();
		funcs = [];
		if(data.length > 0){
			$.each(data,function(i,n){
				n.checked = false;
				var module = getModuleObjById(n.moduleId);
				n.moduleName = "["+module.moduleKey+"]:"+module.moduleName;
				n.updated = "0";//0 表示no changes ,1 updated
				funcs.push(n);
			});	
		}		
		_ractive.set("funcs",funcs);
	}
	
	//取得所有有效的产品类型
	function getModuleList(){
		var ret;
		$.ajax({
			url: manager.root + "/module/getList",
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
	
	//根据ID获得生产类型
	function getModuleObjById(id){
		var obj;
		$(modules).each(function(i,n){			
			if(n.id == id){
				obj = n;
				return false;
			}
		})
		return obj;
	} 
	
	return {
		init:init
	}
}();
$(document).ready(func.init);