var scr = function(){
	var lineName = manager.getPV("lineName");
	var sys_date = manager.getSystemDate();
	var sys_time = manager.getSystemTime();
	var display_data = {currType:"",currJP:"",currRS:"",planCC:"",expectedCC:"",actualCC:"",diff:"",oee:"",nextType:"",nextJP:"",nextRS:""};
	var ractive = null;
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
			},
			oncomplete: function(){	
				getProductInfo();
				
				
			}
		});
		
		ractive.on({
			toShowEditor:function(e){
				$(e.node).hide().next().show().focus();
			},
			toHideEditor:function(e){
				$(e.node).hide().prev().text($(e.node).val()).show();
			}
		}),
		setInterval(getProductInfo, (5000 * 60));
		
	}
	
	function getProductInfo(){
		currYear 	= sys_date.split("-")[0];
		currMonth 	= sys_date.split("-")[1];
		currDay 	= sys_date.split("-")[2];
		currHour 	= sys_time.split(":")[0];
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
			}
    	});
	}
	
	
	
	return {
		init:init
	}
}();
$(document).ready(scr.init);