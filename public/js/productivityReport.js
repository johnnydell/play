var productivityReport = function(){
	var lineName = manager.getPV("lineName");
	var lineId = manager.getPV("lineId");
	var prodObj = {currYear:"", currMonth:""};
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
				manager.loadProperties(this, "productivity", "../../../");
				manager.loadProperties(this, "hourlycount", "../../../");
				manager.loadProperties(this, "delivery", "../../../");
				this.set("years",years);
				this.set("months",months);
				
				prodObj.currYear = sys_date.split("-")[0];
				prodObj.currMonth = sys_date.split("-")[1];
				this.set("prodObj",prodObj);
			},
			oncomplete: function(){	
				manager.setMenuBar("sy");
				productivityChart1.init(lineName, prodObj.currYear);
				productivityChart2.init(lineName, prodObj.currYear);
				productivityChart3.init(lineName, prodObj.currYear, prodObj.currMonth);
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
				productivityChart1.init(lineName, prodObj.currYear);
				productivityChart2.init(lineName, prodObj.currYear);
				productivityChart3.init(lineName, prodObj.currYear, prodObj.currMonth);
			},
			changeMonth:function(){
				productivityChart1.init(lineName, prodObj.currYear);
				productivityChart3.init(lineName, prodObj.currYear, prodObj.currMonth);
			},
			gotoDelivery:function(){
				window.location.href = manager.root + "/views/tpl/kpi/deliveryReport.html?lineName="+lineName+"&lineId="+lineId;
			},
		})
	}
	

	
	
	return {
		init:init
	}
}();
$(document).ready(productivityReport.init);