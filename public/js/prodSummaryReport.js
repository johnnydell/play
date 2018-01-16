var prodSummaryReport = function(){
	
	var prodObj = {currYear:"", currMonth:""};
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
				manager.loadProperties(this, "productivity", "../../../");
				manager.loadProperties(this, "hourlycount", "../../../");
				this.set("years",years);
				this.set("months",months);
				
				prodObj.currYear = sys_date.split("-")[0];
				prodObj.currMonth = sys_date.split("-")[1];
				this.set("prodObj",prodObj);
			},
			oncomplete: function(){	
				prodSummaryChart1.init(prodObj.currYear);
				prodSummaryChart2.init(prodObj.currYear);
				prodSummaryChart3.init(prodObj.currYear, prodObj.currMonth);
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
				prodSummaryChart1.init(prodObj.currYear);
				prodSummaryChart2.init(prodObj.currYear);
				prodSummaryChart3.init(prodObj.currYear, prodObj.currMonth);
			},
			changeMonth:function(){
				prodSummaryChart1.init(prodObj.currYear);
				prodSummaryChart3.init(prodObj.currYear, prodObj.currMonth);
			},
		})
	}
	
	
	return {
		init:init
	}
}();
$(document).ready(prodSummaryReport.init);