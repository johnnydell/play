var safetyEdit = function(){
	var lineName = manager.getPV("lineName");
	var lineId = manager.getPV("lineId");
	var years = manager.years();
	var months = manager.months;
	var sys_date = manager.getSystemDate();
	var safetyObj = {currYear:"", currMonth:"",days:[]};
	var ractive = null;
	function init(){
	   
	   $.get(manager.root+"/views/tpl/board2/safetyEdit.html", function (template) {
	        ractive = new Ractive({
	            el: '.content .maincontent',
	            data:{root:manager.root,lineName:lineName, lineId:lineId},
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "common", "../../");
					this.set("years",years);
					this.set("months",months);
					safetyObj.currYear = sys_date.split("-")[0];
					safetyObj.currMonth = sys_date.split("-")[1];
					safetyObj.days = formDays(safetyObj.currYear, safetyObj.currMonth);
					this.set("safetyObj",safetyObj);
				},
	            oncomplete: function(){
	            	initSafetyValue();
	            }
	        }); 
	        
	        ractive.on({
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
					//refreshAttendance();
					//this.set("attendance",attendance);
					//refreshAttendanceDetails();
					//this.set("attendanceDetails",attendanceDetails);
				},
				toShowLineSelect:function(e){
					$(e.node).hide().next().show().focus();
				},
				toHideLineSelect:function(e){
					$(e.node).hide().prev().show();
				},
	        });
	    });
	}
	
	function initSafetyValue(){
		$.ajax({
			url: manager.root + "/safety/getSafetyInfo",
			type: "GET",
			async:false,
			dataType:"json",
			data:{lineName:lineName,currYear:safetyObj.currYear,currMonth:safetyObj.currMonth},
			contentType: "application/json",
			success: function(data) {
				ret = data;
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
			days.push({id:"0",d:i,v:"",s:verifyWeekend(year,month,i)+'',bg:"white",updated:"0"});//s标示是否为周末
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