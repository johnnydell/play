var deliveryReport = function(){
	var lineName = manager.getPV("lineName");
	var lineId = manager.getPV("lineId");
	var deliveryObj = {currYear:"", currMonth:""};
	function init(){
		
		var sys_date = manager.getSystemDate();
		var years = manager.years();
		var months = manager.months;
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root, lineName:lineName, lineId:lineId},
			onrender: function(){
				manager.loadProperties(this, "common", "../../../");
				manager.loadProperties(this, "delivery", "../../../");
				manager.loadProperties(this, "hourlycount", "../../../");
				manager.loadProperties(this, "oee", "../../../");
				this.set("years",years);
				this.set("months",months);
				
				deliveryObj.currYear = sys_date.split("-")[0];
				deliveryObj.currMonth = sys_date.split("-")[1];
				this.set("deliveryObj",deliveryObj);
			},
			oncomplete: function(){	
				manager.setMenuBar("sy");
				deliveryChart1.init(lineName, deliveryObj.currYear);
				deliveryChart2.init(lineName, deliveryObj.currYear);
				deliveryChart3.init(lineName, deliveryObj.currYear, deliveryObj.currMonth);
			}
		});
		
		ractive.on({
			
			toShowYearSelect:function(e){
				$(e.node).hide().next().show().focus();
			},
			toHideYearSelect:function(e){
				$(e.node).hide().prev().show().text($(e.node).find("option:selected").text());
				
			},
			toShowMonthSelect:function(e){
				$(e.node).hide().next().show().focus();	
			},
			toHideMonthSelect:function(e){
				var _$select = $(e.node);
				_$select.hide().prev().show().text(_$select.find("option:selected").text());
			},
			changeYear:function(){
				deliveryChart1.init(lineName, deliveryObj.currYear);
				deliveryChart2.init(lineName, deliveryObj.currYear);
				deliveryChart3.init(lineName, deliveryObj.currYear, deliveryObj.currMonth);
			},
			changeMonth:function(){
				deliveryChart1.init(lineName, deliveryObj.currYear);
				deliveryChart3.init(lineName, deliveryObj.currYear, deliveryObj.currMonth);
			},
			gotoOEE:function(){
				window.location.href = manager.root + "/views/board/oee.html?lineName="+lineName+"&lineId="+lineId;
			},
		})
	}
	

	
	
	return {
		init:init
	}
}();
$(document).ready(deliveryReport.init);