var kpiScrapSummaryReport = function(){
	
	var scrapObj = {currYear:"", currMonth:""};
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
				manager.loadProperties(this, "safety", "../../../");
				manager.loadProperties(this, "hourlycount", "../../../");
				this.set("years",years);
				this.set("months",months);
				
				scrapObj.currYear = sys_date.split("-")[0];
				scrapObj.currMonth = sys_date.split("-")[1];
				this.set("scrapObj",scrapObj);
			},
			oncomplete: function(){	
				kpiScrapSummaryChart1.init(scrapObj.currYear);
				kpiScrapSummaryChart2.init(scrapObj.currYear);
				kpiScrapSummaryChart3.init(scrapObj.currYear, scrapObj.currMonth);
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
				kpiScrapSummaryChart1.init(scrapObj.currYear);
				kpiScrapSummaryChart2.init(scrapObj.currYear);
				kpiScrapSummaryChart3.init(scrapObj.currYear, scrapObj.currMonth);
			},
			changeMonth:function(){
				kpiScrapSummaryChart1.init(scrapObj.currYear);
				kpiScrapSummaryChart3.init(scrapObj.currYear, scrapObj.currMonth);
			},
		})
	}
	

	
	
	return {
		init:init
	}
}();
$(document).ready(kpiScrapSummaryReport.init);