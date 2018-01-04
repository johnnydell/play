var oee = function(){
	var lineName = manager.getPV("lineName");
	var lineId = manager.getPV("lineId");
	var oeeobj = {currYear:"", currMonth:""};
	function init(){
		
		var sys_date = manager.getSystemDate();
		var years = manager.years();
		var months = manager.months;
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root, lineName:lineName, lineId:lineId},
			onrender: function(){
				manager.loadProperties(this, "oee", "../../");
				this.set("years",years);
				this.set("months",months);
				
				oeeobj.currYear = sys_date.split("-")[0];
				oeeobj.currMonth = sys_date.split("-")[1];
				this.set("oeeObj",oeeobj);
			},
			oncomplete: function(){	
				oeeChart1.init(lineName);
				oeeChart2.init(lineName, oeeobj.currYear);
				oeeChart3.init(lineName, oeeobj.currYear, oeeobj.currMonth);
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
				oeeChart1.init(lineName);
				oeeChart2.init(lineName, oeeobj.currYear);
				oeeChart3.init(lineName, oeeobj.currYear, oeeobj.currMonth);
			},
			changeMonth:function(){
				oeeChart1.init(lineName);
				oeeChart3.init(lineName, oeeobj.currYear, oeeobj.currMonth);
			},
		})
	}
	

	
	
	return {
		init:init
	}
}();
$(document).ready(oee.init);