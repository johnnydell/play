var deliverySummaryReport = function(){
	
	var deliveryObj = {currYear:"", currMonth:""};
	function init(){
		
		var sys_date = manager.getSystemDate();
		var years = manager.years();
		var months = manager.months;
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "common", "../../../");
				manager.loadProperties(this, "delivery", "../../../");
				manager.loadProperties(this, "hourlycount", "../../../");
				this.set("years",years);
				this.set("months",months);
				
				deliveryObj.currYear = sys_date.split("-")[0];
				deliveryObj.currMonth = sys_date.split("-")[1];
				this.set("deliveryObj",deliveryObj);
			},
			oncomplete: function(){	
				deliverySummaryChart1.init(deliveryObj.currYear);
				deliverySummaryChart2.init(deliveryObj.currYear);
				deliverySummaryChart3.init(deliveryObj.currYear, deliveryObj.currMonth);
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
				deliverySummaryChart1.init(deliveryObj.currYear);
				deliverySummaryChart2.init(deliveryObj.currYear);
				deliverySummaryChart3.init(deliveryObj.currYear, deliveryObj.currMonth);
			},
			changeMonth:function(){
				deliverySummaryChart1.init(deliveryObj.currYear);
				deliverySummaryChart3.init(deliveryObj.currYear, deliveryObj.currMonth);
			},
		})
	}
	

	
	
	return {
		init:init
	}
}();
$(document).ready(deliverySummaryReport.init);