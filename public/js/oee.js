var oee = function(){
	function init(){
		var years = manager.years;
		var months = manager.months;
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root},
			onrender: function(){
				manager.loadProperties(this, "oee", "../../");
				this.set("years",years);
				this.set("months",months);
				this.set("currYear","2017");
				this.set("currMonth","12");
			},
			oncomplete: function(){	
				oeeChart1.init();
				oeeChart2.init();
				oeeChart3.init();
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
			}
		})
	}
	
	return {
		init:init
	}
}();
$(document).ready(oee.init);