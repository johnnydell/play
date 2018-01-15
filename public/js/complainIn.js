var complainIn = function(){
	var base = {};
    var years = complain.years ;
	var months = complain.months;
	var limits = complain.limits;
	var types = complain.types;
	var lines = complain.lines;
	var lineId = manager.getPV("lineId");
	function init(){
		$.get(manager.root+"/views/tpl/board2/complainIn.html", function (template) {
			var ractive = new Ractive({
				el: ".maincontent",
				template: template,
				data: {root:manager.root},
				onrender: function(){
					manager.loadProperties(this, "complainIn", "../../");
					manager.loadProperties(this, "common", "../../");
					this.set("years",years);
					this.set("months",months);
					this.set("lines",lines);
					base.id = "0";
					base.line_id = (lineId == '' ? lines[0].id : lineId);
					var sys_date = manager.getSystemDate();
					base.year = sys_date.split("-")[0];
					base.month = sys_date.split("-")[1];
					base.ytarget = "180";
					refreshComplain();
					this.set("base",base);
				},
				oncomplete: function(){}
			});
			
			ractive.on({
				toShowTargetTxt:function(e){
					$(e.node).hide().next().show().focus().select();
				},
				toHideTargetTxt:function(e){
					$(e.node).hide().prev().show();
				},
				toShowLineSelect:function(e){
					$(e.node).hide().next().show().focus();
				},
				toHideLineSelect:function(e){
					$(e.node).hide().prev().show();
				}, 
				toShowYearSelect:function(e){
					$(e.node).hide().next().show().focus();
				},
				toHideYearSelect:function(e){
					$(e.node).hide().prev().show();
				},
				toShowMonthSelect:function(e){
					$(e.node).hide().next().show().focus();	
				},
				toHideMonthSelect:function(e){
					var _$select = $(e.node);
					_$select.hide().prev().show();
				},
				changeLine:function(){
					refreshComplain();
					this.set("base",base);
				},
				changeYear:function(){
					refreshComplain();
					this.set("base",base);
				},
				changeMonth:function(){
					refreshComplain();
					this.set("base",base);
				},
				toShowColumnEditor:function(e){
					$(e.node).hide().next().show().focus().select();
				},
				toHideColumnEditor:function(e){
					$(e.node).hide().prev().show();
					var type = $(e.node).parent().attr("lang");
					if(type == 'actual'){
					  /*var row_index = e.index.index;
					  var col_index = e.index.flag;*/
					  //重新统计列
					  var input_total = 0;
					  var hc_total = 0;
					  for(i = 0;i<=base.days.length-1;i++){
					   	var c_total = 0;
					   	for(k = 0;k<= base.actual.length-2;k++){
					   		var v = base.actual[k].days[i].v;
					   		c_total += parseInt(v == '' ? '0':v);
					   	}
					   	
					   	var hc_v = base.hc[i];
					   	base.actual[base.actual.length-2].days[i].v = (hc_v == '0' ? '0' : (c_total/hc_v).toFixed(2));
					   	
					   	input_total += c_total;
					   	hc_total += hc_v;
					   	base.actual[base.actual.length-1].days[i].v = (hc_total == '0' ? '0':(input_total/hc_total).toFixed(2));
					  }
					  
					  
					  
					      //重新统计列
					    /*var c_total = 0;
						  for(i = 0; i<base.actual.length-2;i++){
							  var v = base.actual[i].days[col_index].v;
							  c_total += parseInt(v == '' ? '0':v);
						  }
						  var hc_v = base.hc[col_index];
						  base.actual[base.actual.length-2].days[col_index].v = (hc_v == '0' ? '0' : (c_total/hc_v).toFixed(2));	*/
					  
					     //跟新当前列累计
					    /* if(row_index == 0){
						   var accumu_row_index = base.actual.length-1;
						   for(i = col_index;i<=base.days.length-1;i++){
							  var preC_accumu_v = (i == 0 ? 0 :base.actual[accumu_row_index].days[i-1].v);
							  var curr_fst_v = base.actual[0].days[i].v;
							  base.actual[base.actual.length-1].days[i].v = parseInt(preC_accumu_v == '' ? '0':preC_accumu_v) + parseInt(curr_fst_v == '' ? '0':curr_fst_v);
						   }
					      }	*/			  
					}					
					this.update("base");
				},
				saveComplain:function(){	
					var error = false;
					if(base.ytarget == ''){
						jAlert($.i18n.prop("i18n_required"), $.i18n.prop("i18n_error"));
						error = true;
						return false;
					}
					if(!error){
						base.ytarget = parseInt(base.ytarget);
						$.ajax({
							url: manager.root + "/complain/saveComplain",
							type: "POST",
							dataType: "text",
							data:JSON.stringify({base:base}),
							contentType: "application/json",    
							beforeSend: function() {
								manager.block();
							},
							success: function(data) {
								refreshComplain();
								ractive.set("base",base);
								jAlert($.i18n.prop("i18n_save_ok"), $.i18n.prop("i18n_info"));
							},
							complete: function() {
								manager.unblock();
							}
						});
					}
				},
				test:function(){
					console.log(base.hc);
				}
			})
	    });
	}
		
	//根据产线和年月获得对应的投诉记录
	function getComplainInfo(line_id,year,month){
		var ret;
		$.ajax({
			url: manager.root + "/complain/getComplainInfo",
			type: "GET",
			async:false,
			dataType:"json",
			data:{line_id:line_id,year:year,month:month},
			contentType: "application/json",
			success: function(data) {
				ret = data;
			}
		});	
		return ret; 
	}
	
	function getCurrentMonthDaysHC(line_id,year,month,daysCnt){
		var ret;
		$.ajax({
			url: manager.root + "/complain/getHCDaysActuals",
			type: "GET",
			async:false,
			dataType:"json",
			data:{line_id:line_id,year:year,month:month,daysCnt:daysCnt},
			contentType: "application/json",
			success: function(data) {
				ret = data;
			}
		});	
		return ret; 
	}
	
	function refreshComplain(){
		var info = getComplainInfo(base.line_id,base.year,base.month);
		base.id = info.id;
		base.line_name = info.productLine.lineName;
		base.line_id = info.productLine.id;
		base.ytarget = (info.totalTarget == '' ? '180':info  .totalTarget);
		var daysCnt = cntDays(base.year,base.month);
		base.daysCnt = daysCnt;
		base.days = formDays(base.year,base.month,"0");	
		var actual = [];
		var target = [];
		var hc = getCurrentMonthDaysHC(base.line_id,base.year,base.month,daysCnt);
		base.hc = hc;
		if(base.id != '0'){
			var type_id = "0";
			var days = [];
			$(info.complainActualDays).each(function(i,n){
				  if(type_id != n.typeId){
					  type_id = n.typeId;
					  days = [];
					  actual.push({
							type_id:type_id,
							type_name:getComplainTypeObjById(type_id).typeName,
							days:days
					  });
				  }
				  days.push({id:n.id,type_id:type_id,d:n.dayKey,v:n.dayVal});
			})
			//增加统计2行
			actual.push({
				type_id:"-1",
				type_name:$.i18n.prop("i18n_complainIn_actual_in_all"),
				days:formDays(base.year,base.month,"-1","0")
			});
			actual.push({
				type_id:"-2",
				type_name:$.i18n.prop("i18n_complainIn_accumulation"),
				days:formDays(base.year,base.month,"-2","0")
			});			
			//封装目标行
			$(info.complainTargetDays).each(function(i,n){
				target.push({id:n.id,type_id:"-3",d:n.dayKey,v:n.dayVal});
			})
		} else {
			$(types).each(function(i,n){
				actual.push({
					type_id:n.id,
					type_name:n.typeName,
					days:formDays(base.year,base.month,n.id,"180")
				});
			})
			actual.push({
				type_id:"-1",
				type_name:$.i18n.prop("i18n_complainIn_actual_in_all"),
				days:formDays(base.year,base.month,"-1","0")
			});
			actual.push({
				type_id:"-2",
				type_name:$.i18n.prop("i18n_complainIn_accumulation"),
				days:formDays(base.year,base.month,"-2","0")
			});
			target = formDays(base.year,base.month,"-3","180");
		}
		//对2行进行统计
		var input_total = 0;
		var hc_total = 0;
	    for(i = 0;i<=base.days.length-1;i++){
	    	var c_total = 0;
	    	for(k = 0;k<= actual.length-2;k++){
	    		var v = actual[k].days[i].v;
	    		c_total += parseInt(v == '' ? '0':v);
	    	}
	    	
	    	var hc_v = base.hc[i];
	    	actual[actual.length-2].days[i].v = (hc_v == '0' ? '0' : (c_total/hc_v).toFixed(2));
	    	
	    	input_total += c_total;
	    	hc_total += hc_v;
	    	actual[actual.length-1].days[i].v = (hc_total == '0' ? '0':(input_total/hc_total).toFixed(2));
	    }
		base.actual = actual;
		base.target = target;
	}
	
	//根据ID获得投诉类型
	function getComplainTypeObjById(id){
		var obj;
		$(types).each(function(i,n){			
			if(n.id == id){
				obj = n;
				return false;
			}
		})
		return obj;
	}
	
	//根据年月返回天数
	function cntDays(year,month){
		return manager.getDaysCnt(year,month);
	}
	
	//根据年月返回所有天对象
	function formDays(year,month,type_id,_defVal){
		var days = [];
		var daysCnt = cntDays(year,month);
		var defVal = _defVal == undefined ? "":_defVal
		for(i = 1;i <= daysCnt;i++){
			days.push({id:"0",type_id:type_id,d:i,v:defVal});
		}
		return days;
	}
	
	return {
		init:init
	}
}();
