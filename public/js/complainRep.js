var complainRep = function(){
	var base = {};
	var lineName = manager.getPV("lineName");
	var lineId = manager.getPV("lineId");
	var lines = common.getAllLines();
	var types = common.getComplainType();
	var years = manager.years();
	var months = manager.months;	
	function init(){		
		var sys_date = manager.getSystemDate();
		var years = manager.years();
		var months = manager.months;
		var ractive = new Ractive({
			el: ".container",
			template: "#main-template",
			data: {root:manager.root, lineName:lineName, lineId:lineId},
			onrender: function(){
				manager.loadProperties(this, "complainRep", "../../");
				this.set("years",years);
				this.set("months",months);	
				this.set("lines",lines);
				base.line_id = (lineId == '' ? lines[0].id : lineId);
				base.line_name = (lineId == '' ? lines[0].lineName : lineName);
				var sys_date = manager.getSystemDate();
				base.year = sys_date.split("-")[0];
				base.month = sys_date.split("-")[1];
				this.set("base",base);
			},
			oncomplete: function(){	
				complainChart1.init(base);
				complainChart2.init(base);
				complainChart3.init(base);
			}
		});
		
		ractive.on({
			toShowLineSelect:function(e){
				$(e.node).hide().next().show().focus();
			},
			toHideLineSelect:function(e){
				$(e.node).hide().prev().show();
			}, 
			toShowYearSelect:function(e){
				$(e.node).hide().next().show().focus();
			},
			toHideYearSelect:function(e){
				$(e.node).hide().prev().show();
				
			},
			toShowMonthSelect:function(e){
				$(e.node).hide().next().show().focus();	
			},
			toHideMonthSelect:function(e){
				var _$select = $(e.node);
				_$select.hide().prev().show();
			},
			changeYear:function(){
				complainChart1.init(base);
				complainChart2.init(base);
				complainChart3.init(base);
			},
			changeMonth:function(){
				complainChart3.init(base);
			},
		})	
	}
	
	return {
		init:init
	}
}();
$(document).ready(complainRep.init);