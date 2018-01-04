var scr = function(){
	var lineName = manager.getPV("lineName");
	var sys_date = manager.getSystemDate();
	var sys_time = manager.getSystemTime();
	var sysParam = manager.getSystemParams();
	var time_interval = 1000 * 10;//10 seconds
	var intervalObj = null;
	var color_yellow = {minvalue:0, maxvalue:0};
	var color_green = {value:0};
	var color_red = {value:0};
	var color_selected = 0;
	var display_data = {currType:"",currJP:"",currRS:"",planCC:"",expectedCC:"",actualCC:"",diff:"",oee:"",nextType:"",nextJP:"",nextRS:""};
	var ractive = null;
	var lines = getAllLines();
	function init(){
		var data;
		ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root, 
					lineName: lineName,
					format		: function(num){
						if (!manager.isNull(num) ){
							if (num > 0)
								return "+" + num;
							else
								return num;
							
						}
					},
					percentage		: function(num){
						return (num * 1).toFixed( 1 ) + ' %';
					},
				},
			
			onrender: function(){
				manager.loadProperties(this, "scr", "../");
				manager.setMenuBar("scr");
				this.set("lines",lines);
			},
			oncomplete: function(){	
				getProductInfo();
				
				//check time interval if it's set or not
				if (!manager.isNull(sysParam["SCREEN"])){
					if (!manager.isNull(sysParam["SCREEN"]["TIME_INTERVAL"])){
						time_interval = parseInt(sysParam["SCREEN"]["TIME_INTERVAL"].paramValue) * 1000;
						clearInterval(intervalObj);
						intervalObj = setInterval(getProductInfo, time_interval);
            		}
				}
				
				
			}
		});
		
		ractive.on({
			toShowEditor:function(e){
				$(e.node).hide().next().show().focus();
			},
			toHideEditor:function(e){
				$(e.node).hide().prev().text($(e.node).val()).show();
			},
			toShowLineSelect:function(e){
				$(e.node).hide().next().show().focus();
			},
			toHideLineSelect:function(e){
				$(e.node).hide().prev().show();
			},
			changeLine:function(e){
				//console.log("linename = " + $(e.node).val());
				lineName = $(e.node).val();
				console.log("linename = " + lineName);
				getProductInfo();
				this.set("lineName", lineName);
			},
		}),
		intervalObj = setInterval(getProductInfo, time_interval);
		
	}
	
	function getProductInfo(){
		currYear 	= sys_date.split("-")[0];
		currMonth 	= sys_date.split("-")[1];
		currDay 	= sys_date.split("-")[2];
		currHour 	= parseInt(sys_time.split(":")[0] ) - 1;
		currMin 	= sys_time.split(":")[1];
		$.ajax({
			url		: manager.root + '/scr/getProductInfo',
			type	: 'GET',
			dataType:"json",
			data:{lineName:lineName,yearValue:currYear, monthValue:currMonth, dayValue:currDay, hourValue:currHour, minValue: currMin},
			contentType: "application/json",
			success: function(listdata)
			{
				
				display_data.currType 	= listdata.currType;
				display_data.currJP 	= listdata.currJP;
				display_data.currRS 	= listdata.currRS;
				display_data.planCC 	= listdata.planCC;
				display_data.expectedCC = listdata.expectedCC;
				display_data.actualCC 	= listdata.actualCC;
				display_data.diff 		= listdata.diff;
				display_data.oee 		= listdata.oee;
				display_data.nextType 	= listdata.nextType;
				display_data.nextJP 	= listdata.nextJP;
				display_data.nextRS 	= listdata.nextRS;
				
				ractive.set("displayData", display_data);
				
				
				if (!manager.isNull(sysParam["SCREEN"])){
					if (!manager.isNull(sysParam["SCREEN"]["COLOR_GREEN"])){
						color_green.value = sysParam["SCREEN"]["COLOR_GREEN"].paramValue;
            		}
				}
				if (!manager.isNull(sysParam["SCREEN"])){
					if (!manager.isNull(sysParam["SCREEN"]["COLOR_RED"])){
						color_red.value = sysParam["SCREEN"]["COLOR_RED"].paramValue;
            		}
				}
				if (!manager.isNull(sysParam["SCREEN"])){
					if (!manager.isNull(sysParam["SCREEN"]["COLOR_RED"])){
						color_yellow.min = sysParam["SCREEN"]["COLOR_RED"].paramValue.split(",")[0];
						color_yellow.max = sysParam["SCREEN"]["COLOR_RED"].paramValue.split(",")[1];
            		}
				}
				
				//display light
				if (!manager.isNull(display_data.planCC)){
					var percentage = Math.ceil((display_data.actualCC * 100) / display_data.planCC);
					if (percentage <= color_red.value){
						color_selected = 2;//red
					}
					else if (percentage >= color_green.value){
						color_selected = 0;//green
					}
					else if (percentage >= color_yellow.min && percentage < color_yellow.max ){
						color_selected = 1;//yellow
					}
				}
				
				ractive.set("color_selected", color_selected);
			}
    	});
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
$(document).ready(scr.init);