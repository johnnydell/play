var scr = function(){
	var lineName = manager.getPV("lineName");
	var sys_date = manager.getSystemDate();
	var sys_time = manager.getSystemTime();
	var data = {};
	function init(){
		var data;
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root, lineName: lineName},
			onrender: function(){
				manager.loadProperties(this, "scr", "../");
				manager.setMenuBar("scr");
			},
			oncomplete: function(){	
				
				getProductInfo();
				this.set("data",data);
				
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
		
		setInterval(getProductInfo,5000);
		
		ractive.update();
	}
	
	function getProductInfo(){
		currYear 	= sys_date.split("-")[0];
		currMonth 	= sys_date.split("-")[1];
		currDay 	= sys_date.split("-")[2];
		currHour 	= sys_time.split(":")[0];
		
		$.ajax({
			url		: manager.root + '/scr/getProductInfo',
			type	: 'GET',
			dataType:"json",
			data:{lineName:lineName,yearValue:currYear, monthValue:currMonth, dayValue:currDay, hourValue:currHour},
			contentType: "application/json",
			success: function(listdata)
			{
				
				data.currType = listdata.currType;
				data.currJP = listdata.currJP;
				data.currRS = listdata.currRS;
				data.planCC = listdata.planCC;
				data.actualCC = listdata.actualCC;
				data.oee = listdata.oee;
				data.nextType = listdata.nextType;
				data.nextJP = listdata.nextJP;
				data.nextRS = listdata.nextRS;
			}
    	});
	}
	
	return {
		init:init
	}
}();
$(document).ready(scr.init);