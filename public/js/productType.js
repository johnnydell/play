var productType = function(){
	var limits = permission.load("product_type");
	var types = [];
	function init(){	
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root,limits:limits},
			onrender: function(){
				manager.loadProperties(this, "productType", "../../");
				manager.loadProperties(this, "common", "../../");
				refreshType(this);
			},oncomplete: function(){}
		});
		
		ractive.on({
			checkAll:function(e){
				$(types).each(function(i,n){
					n.checked = $(e.node).is(':checked');
				});				
				ractive.update("types");
			},
			toShowColumnEditor:function(e){	
				if(limits.add_save_delete){
					$(e.node).hide().next().show().focus();
				}
			},
			toHideColumnEditor:function(e){
				var type = e.node.type;
				if(type == 'select-one'){
					$(e.node).hide().prev().show().text($(e.node).find("option:selected").text());
				} else {
					$(e.node).hide().prev().show().text($(e.node).val());
				}
				var index = $(e.node).parent().parent().attr("lang");
				types[index].updated = "1";
				ractive.update("types");
			},
			validatePercentValue:function(e){
				var value = $(e.node).val();
				if(!manager.percentNumFormat(value)){
					
					$("#msgInfo").html($.i18n.prop("i18n_incorrect_data_format")).css("color", "red");
					$(e.node).focus().select();
				}
				else{
					$(e.node).hide().prev().show().text($(e.node).val());
					$("#msgInfo").html("");
				}
					
				
			},
			addType:function(){				
				var type = {
						id:"0",
						checked:false,
						name:"",
						cycle_time:"",
						persons:"",
						plan_output:'',
						target_output:'',
						updated:'0'
				};
				types.unshift(type);
				ractive.update("types");
			},
			deleteType:function(){
				var deletedType =[];
				var deleteCnt = 0;
				$(types).each(function(i,n){
					if(n.checked){
						if(n.id != '0'){
							deletedType.push(n);
						}
						deleteCnt++;
					}
				})
				
				if(deleteCnt > 0){
					if(deletedType.length > 0){
						$.ajax({
							url: manager.root + "/productType/deleteType",
							type: "POST",
							dataType: "json",
							data:JSON.stringify({deletedType:deletedType}),
							contentType: "application/json",    
							beforeSend: function() {
								manager.block();
							},
							success: function(data) {
								var i = types.length-1;
								while (i >= 0){
								  var temp = types[i];
								  if(temp.checked){
									  types.splice(i,1);	
								  }
								  i--;
								}	
								ractive.set("types",types);		
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
						var i = types.length-1;
						while (i >= 0){
						  var temp = types[i];
						  if(temp.checked){
							  types.splice(i,1);	
						  }
						  i--;
						}	
						ractive.set("types",types);		
						jAlert($.i18n.prop("i18n_delete_ok"), $.i18n.prop("i18n_info"));
					}
				} else {
					jAlert($.i18n.prop("i18n_select_to_delete"), $.i18n.prop("i18n_error"));
				}    
			},
			saveType:function(){
				var error = false;
				$(types).each(function(i,n){
					if(n.name == '' || n.cycle_time == '' || n.persons == '' || 
							n.plan_output == '' || n.target_output == '' ){	
						jAlert($.i18n.prop("i18n_required"), $.i18n.prop("i18n_error"));
						error = true;
						return false;
					}
					
					if(parseFloat($.trim(n.target_output))>100){
						jAlert($.i18n.prop("i18n_incorrect_data_format"), $.i18n.prop("i18n_error"));
						error = true;
						return;
					}
				})
				
				if(!error){
					//整理出需要新增和更新的
					var addType = [];
					var updateType = [];
					$(types).each(function(i,n){
						if(n.id == '0'){
							addType.push(n);
						} else if(n.updated == "1"){
							updateType.push(n);
						}
					})
					
					if(addType.length > 0 || updateType.length > 0){
						$.ajax({
							url: manager.root + "/productType/saveType",
							type: "POST",
							dataType: "json",
							data:JSON.stringify({addType:addType,updateType:updateType}),
							contentType: "application/json",    
							beforeSend: function() {
								manager.block();
							},
							success: function(data) {
								refreshType(ractive);	
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
				console.log("sadfdsf");
			}			
		})
	}
	
	//获得当前有效的产品类型列表
	function getTypeList(){
		var ret;
		$.ajax({
			url: manager.root + "/productType/getList",
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
	
	//刷新Types
	function refreshType(_ractive){
		var data = getTypeList();
		types = [];
		if(data.length > 0){
			$(data).each(function(i,n){
				var type = {};
				type.id = n.id;
				type.checked = false;
				type.name = n.productTypeName;
				type.cycle_time = n.cycle;
				type.persons = n.persons;
				type.plan_output = n.planOutput;
				type.target_output = n.targetOutput;
				type.updated = "0";
				types.push(type);
			})			
		}
		_ractive.set("types",types);
	}
	
	return {
		init:init
	}
}();
$(document).ready(productType.init);