var hcConfig = function(){
	var base1 = {};
	var base2 = {};
	var sys_date = manager.getSystemDate();
	var lines = getAllLines();
	var types = getAllProductType();
	var years = manager.years();
	function init(){	
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "hcConfig", "../../");
				manager.loadProperties(this, "common", "../../");
				this.set("lines",lines);
				this.set("types",types);
				base1.line_id = "9336b6f78e7448e685bad5ba71c2e3f8";
				base1.date = sys_date;
				refreshHCInfo(this);
			},
			oncomplete: function(){				
				$('.date').datetimepicker({
					yearOffset:0,
					timepicker:false,
					format:'Y-m-d',
					minDate:years[0]+'/01/01',
					maxDate:years[years.length-1]+'/12/31'
				});
			}
		});
		
		ractive.on({
			toShowLineSelect:function(e){
				$(e.node).hide().next().show().focus();
			},
			toHideLineSelect:function(e){
				var line_name = $(e.node).find("option:selected").text();
				base1.line_name = line_name;	
				refreshHCInfo(ractive);
				$(e.node).hide().prev().show();
			}, 
			disableKeydown:function(){
				return false;
			},
			toShowDateText:function(e){
				$(e.node).hide().next().show().focus();	
			},
			toHideDateText:function(e){
				refreshHCInfo(ractive);
				$(e.node).hide().prev().show();
			},
			toShowOEEPerctgText:function(e){
				$(e.node).hide().next().show().focus();	
			},
			toHideOEEPerctgText:function(e){
				$(e.node).hide().prev().show();
			},
			toShowPlanCPLTOTText:function(e){
				$(e.node).hide().next().show().focus();	
			},
			toHidePlanCPLTOTText:function(e){
				$(e.node).hide().prev().show();
			},
			toShowColumnEditor:function(e){	
				$(e.node).hide().next().show().focus();
			},
			toHideColumnEditor:function(e){
				var type = e.node.type;
				var lang = $(e.node).parent().parent().attr("lang");
				var base = lang.split("_")[0];
				var index = lang.split("_")[1];
				if(type == 'select-one'){
					var txt = $(e.node).find("option:selected").text();
					var typeId = $(e.node).find("option:selected").val();
					var type = (typeId == '' ? {cycle:'',persons:''}:getTypeObjById(typeId));
					var colName = $(e.node).attr("colName");
					if(colName != undefined && (colName == 'type1' || colName == 'type2')){
						if(base == "base1"){
							if(colName == 'type1'){
								base1.details[index]["product_type_name_1"] = txt;
								base1.details[index]["product_cycle_1"] = type.cycle;
								base1.details[index]["product_persons_1"] = type.persons;
							} else {
								base1.details[index]["product_type_name_2"] = txt;
								base1.details[index]["product_cycle_2"] = type.cycle;
								base1.details[index]["product_persons_2"] = type.persons;
							}
							
							var type1_Id = base1.details[index]["product_type_id_1"];
							var type2_Id = base1.details[index]["product_type_id_2"];
							if(type2_Id !=''){
								var type2 = getTypeObjById(type2_Id);
								plan_output = 60*type2.calcValue/type2.cycle;
							}
							
							ractive.update("base1");	
						} else if(base == "base2") {
							if(colName == 'type1'){
								base2.details[index]["product_type_name_1"] = txt;
								base2.details[index]["product_cycle_1"] = type.cycle;
								base2.details[index]["product_persons_1"] = type.persons;
							} else {
								base2.details[index]["product_type_name_2"] = txt;
								base2.details[index]["product_cycle_2"] = type.cycle;
								base2.details[index]["product_persons_2"] = type.persons;
							}
							ractive.update("base2");	
						}
					}
				} 
				$(e.node).hide().prev().show();				
			},
			saveHCConfig:function(){
				var error = false;
				//判断opl详细有没为空的
				$(opl).each(function(i,n){
					if(n.date == '' || n.refNo == '' || n.founder == '' || 
							n.station == '' || n.dtFrom == '' || n.dtTo == '' ||
							n.timing == '' || n.amt == '' || n.immediate == '' || n.responsible == '' || n.deadline == ''){	
						jAlert($.i18n.prop("i18n_required"), $.i18n.prop("i18n_error"));
						error = true;
						return false;
					}
				})
				
				if(!error){
					//整理出需要新增和更新的
					var updateDetails = [];
					$(opl).each(function(i,n){
						if(n.id == '0'){
							addOPL.push(n);
						} else if(n.updated == "1"){
							updateOPL.push(n);
						}
					})
					
					if(addOPL.length > 0 || updateOPL.length > 0){
						$.ajax({
							url: manager.root + "/opl/saveOPL",
							type: "POST",
							dataType: "json",
							data:JSON.stringify({condition:condition,addOPL:addOPL,updateOPL:updateOPL}),
							contentType: "application/json",    
							beforeSend: function() {
								manager.block();
							},
							success: function(data) {
								refreshOPL(ractive);	
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
				console.log(base1);
			}			
		})
	}
	
	//根据ID获得生产类型
	function getTypeObjById(id){
		var obj;
		$(types).each(function(i,n){
			if(n.id == id){
				obj = n;
				return false;
			}
		})
		return obj;
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
	
	//缺德所有有效的产品类型
	function getAllProductType(){
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
	
	//获得当前日期的和明天的配置信息
	function getHCInfo(){
		var ret;
		$.ajax({
			url: manager.root + "/hcConfig/getHCInfo",
			type: "GET",
			async:false,
			dataType:"json",
			data:{line_id:base1.line_id,curr_date:base1.date},
			contentType: "application/json",
			success: function(data) {
				ret = data;
			}
		});
		return ret;
	}
	
	//刷新配置信息
	function refreshHCInfo(_ractive){
		var data = getHCInfo();
		var _line = data.line;
		var _base1 = data.base1;
		var _base2 = data.base2;
	    //绑定base1数据
		base1.line_name = _line.lineName;
		if(_base1 != null){
			base1.id = _base1.id;
			base1.target_oee_percent = _base1.targetOeePercent;
			base1.plan_opl_total_output = _base1.planOplTotalOutput;
			var details = []
			if(_base1.hcConfigDetail != null && _base1.hcConfigDetail.length  > 0){
				$(_base1.hcConfigDetail).each(function(i,n){
					var detail = {};
					detail.id = n.id;
					detail.prefix = n.productHour - 1;
					detail.product_hour = n.productHour;
					detail.product_type_id_1 = n.productType1.id;
					detail.product_type_id_2 = n.productType2.id;
					detail.product_type_name_1 = n.productType1.productTypeName;
					detail.product_type_name_2 = n.productType2.productTypeName;
					detail.product_cycle_1 = n.productType1.cycle;
					detail.product_cycle_2 = n.productType2.cycle;
					detail.product_persons_1 = n.productType1.persons;
					detail.product_persons_2 = n.productType2.persons;
					detail.plan_count = n.planCount;
					detail.actual_count = n.actualCount;
					detail.updated = "0";
					details.push(detail);
				})
			} else {
				base1.details = formHCDetailPre();
			}
			base1.detail = details;	
		} else {
			base1.id = "0";
			base1.target_oee_percent = "";
			base1.plan_opl_total_output = "";
			base1.details = formHCDetailPre();
		}
		
		//绑定base2数据
		if(_base2 != null){
			base2.id = _base2.id;
			var details = []
			if(_base2.hcConfigDetail != null && _base2.hcConfigDetail.length  > 0){
				$(_base2.hcConfigDetail).each(function(i,n){
					var detail = {};
					var prefix = i-1;
					if(perfix == -1){
						prefix = "23";
					} else if(prefix == 0){
						prefix = "00";
					}
					detail.id = n.id;
					detail.prefix = prefix;
					detail.product_hour = n.productHour;
					detail.product_type_id_1 = n.productType1.id;
					detail.product_type_id_2 = n.productType2.id;
					detail.product_type_name_1 = n.productType1.productTypeName;
					detail.product_type_name_2 = n.productType2.productTypeName;
					detail.product_cycle_1 = n.productType1.cycle;
					detail.product_cycle_2 = n.productType2.cycle;
					detail.product_persons_1 = n.productType1.persons;
					detail.product_persons_2 = n.productType2.persons;
					detail.plan_count = n.planCount;
					detail.actual_count = n.actualCount;
					detail.updated = "0";
					details.push(detail);
				})
			} else {
				base2.details = formHCDetailSuf();
			}
			base2.detail = details;		
		} else {
			base2.id = "0";
			base2.details = formHCDetailSuf();
		}
		
		_ractive.set("base1",base1);
		_ractive.set("base2",base2);
	}
	
	//形成当前日期的明细
	function formHCDetailPre(){
		var details = [];
		for(i = 8; i<= 23; i++){
			details.push({
				id:"0",
				prefix:i-1,
				product_hour:i,
				product_type_id_1:"",
				product_type_id_2:"",
				product_type_name_1:"",
				product_type_name_2:"",
				product_cycle_1:"",
				product_cycle_2:"",
				product_persons_1:"",
				product_persons_2:"",
				plan_count:"",
				actual_count:"",
				updated:"0"
			});
		}
		return details;
	}
	
	//形成明天目标分的明细
	function formHCDetailSuf(){
		var details = [];
		for(i = 0; i<= 7;i++){
			var prefix = i-1;
			if(prefix == -1){
				prefix = "23";
			} else if(prefix == 0){
				prefix = "00";
			}
			details.push({
				id:"0",
				prefix:prefix,
				product_hour:i,
				product_type_id_1:"",
				product_type_id_2:"",
				product_type_name_1:"",
				product_type_name_2:"",
				product_cycle_1:"",
				product_cycle_2:"",
				product_persons_1:"",
				product_persons_2:"",
				plan_count:"",
				actual_count:"",
				updated:"0"
			});
		}
		return details;
	}
	
	return {
		init:init
	}
}();
$(document).ready(hcConfig.init);