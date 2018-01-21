var safetyEdit = function(){
	var lineName = manager.getPV("lineName");
	var lineId = manager.getPV("lineId");
	var years = manager.years();
	var months = manager.months;
	var sys_date = manager.getSystemDate();
	var safetyObj = {lineId:lineId,currYear:"", currMonth:"",days:[]};
	var ractive1 = null;
	var limits = permission.load("safety");
	function init(){
	   
	   $.get(manager.root+"/views/tpl/board2/safetyEdit.html", function (template) {
	        ractive1 = new Ractive({
	            el: '.content .maincontent',
	            data:{root:manager.root,lineName:lineName, lineId:lineId},
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "common", "../../");
					this.set("years",years);
					this.set("months",months);
					safetyObj.currYear = sys_date.split("-")[0];
					safetyObj.currMonth = sys_date.split("-")[1];
					
					this.set("safetyObj",safetyObj);
				},
	            oncomplete: function(){
	            	initSafetyValue();
	            }
	        }); 
	        
	        ractive1.on({
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
				changeMonth:function(){
					initSafetyValue();
				},
				changeYear:function(){
					initSafetyValue();
				},
				toShowLineSelect:function(e){
					$(e.node).hide().next().show().focus();
				},
				toHideLineSelect:function(e){
					$(e.node).hide().prev().show();
				},
				/*hide label, show text*/
				toShowColumnEditor:function(e){
					if(limits.add_save_delete){
						e.context.v0 = $(e.node).children(0).html();
						$(e.node).children(0).hide().next().show().focus().select();
					}
				},
				/*hide text, show label*/
				toHideColumnEditor:function(e){
					var value = $(e.node).val();
					$(e.node).hide().prev().show().text(value);
					
					
					if (value !== e.context.v0){
						e.context.updated = "1";
					}
					else{
						e.context.updated = "0";
					}
					
					//累计
					var subTotal = 0;
					for(i = 0; i < safetyObj.days.length; i ++){
						if (!manager.isNull(safetyObj.days[i].v1)){
							subTotal += parseInt(safetyObj.days[i].v1);
						}
						safetyObj.days[i].v3 = subTotal;
					}
					
					this.update();
					
				},
				onlyAcceptNum:function(e){
					var val = $(e.node).val();
    				$(e.node).val(val.replace(/\D/g, ''));
				},
				saveSafety:function(){
					var updated = false;
					for(i = 0; i < safetyObj.days.length; i ++){
						if (safetyObj.days[i].updated == '1'){
							updated = true;
							break;
						}
					}
					//some items are updated
					if (updated){
						var params = {
								safetyObj:safetyObj
						};
						$.ajax({
							url: manager.root + "/safety/saveSafetyInfo",
							type: "POST",
							async:false,
							dataType:"json",
							data:JSON.stringify(params),
							contentType: "application/json",
							success: function(data) {
								if (data == '1'){
									jAlert($.i18n.map['i18n_save_ok'], $.i18n.map['i18n_info']);	
									for(i = 0; i < safetyObj.days.length; i ++){
										safetyObj.days[i].updated = '0';
									}
									ractive1.update();
								}
								else{
									jAlert($.i18n.map['i18n_save_error'], $.i18n.map['i18n_error']);	
								}
								
							}
						});
					}
						
				}
	        });
	    });
	}
	
	function initSafetyValue(){
		safetyObj.days = formDays(safetyObj.currYear, safetyObj.currMonth);
		$.ajax({
			url: manager.root + "/safety/getSafetyInfo",
			type: "GET",
			async:false,
			dataType:"json",
			data:{lineName:lineName,currYear:safetyObj.currYear,currMonth:safetyObj.currMonth},
			contentType: "application/json",
			success: function(data) {
				if (data !== ''){
					for (i = 0; i < data.length; i++){
						//get safety date
						var safetyDate = data[i].safetyDate;
						if (!manager.isNull(safetyDate)){
							var dayDate = new Date(safetyDate);
							dateStr = $.datepicker.formatDate("yy-mm-dd",dayDate);
							day = parseInt(dateStr.split("-")[2]);
							safetyObj.days[day - 1].id=data[i].id;
							safetyObj.days[day - 1].v1=data[i].safetyActualCount;
							safetyObj.days[day - 1].v2=data[i].safetyTargetCount;
							
						}
						
					}
					
					//累计
					var subTotal = 0;
					for(i = 0; i < safetyObj.days.length; i ++){
						if (!manager.isNull(safetyObj.days[i].v1)){
							subTotal += parseInt(safetyObj.days[i].v1);
						}
						safetyObj.days[i].v3 = subTotal;
					}
					ractive1.update();
				}
			}
		});	
	}
	
	//根据年月返回天数
	function cntDays(year,month){
		return manager.getDaysCnt(year,month);
	}
	
	//根据年月返回所有天对象
	function formDays(year,month){
		var days = [];
		var daysCnt = cntDays(year,month);
		for(i = 1;i <= daysCnt;i++){
			//days.push({id:"0",d:i,v0:"",v1:"", v2:"0",v3:0,s:verifyWeekend(year,month,i)+'',bg:"white",updated:"0"});//s标示是否为周末
			days.push({id:"0",d:i,v0:"",v1:"", v2:"0",v3:0,s:0,bg:"white",updated:"0"});//s标示是否为周末
		}
		return days;
	}
	
	//验证日期是否为周末
	function verifyWeekend(year,month,day){
		var dt = new Date(parseInt(year),parseInt(month)-1,parseInt(day));
		var ret = 0;//not a weekend day		
		if (dt.getDay() == 0 || dt.getDay() == 6){
		  ret = 1;
		} 
		return ret;
	}
	
		
	return {
		init:init
	}
}();