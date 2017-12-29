var sysconfig = function(){
	
	function init(){
		
		var sys_date = manager.getSystemDate();
		var years = manager.years();
		var months = manager.months;
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "sysconfig", "../../");
				this.set("years",years);
				this.set("months",months);
				
				
			},
			oncomplete: function(){	
				oeeLossSubType.init();
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
$(document).ready(sysconfig.init);