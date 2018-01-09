var complainOut = function(){
	var base = {};
	var years = complain.years ;
	var months = complain.months;
	var limits = complain.limits;
	var types = complain.types;
	var lines = complain.lines;
	var lineId = manager.getPV("lineId");
	var lineName = manager.getPV("lineName");
	var oeeobj = {currYear:"", currMonth:""};
	function init(){		
		var sys_date = manager.getSystemDate();
		var years = manager.years();
		var months = manager.months;
		$.get(manager.root+"/views/tpl/board2/complainOut.html", function (template) {
			var ractive = new Ractive({
				el: ".maincontent",
				template: template,
				data: {root:manager.root, lineName:lineName, lineId:lineId},
				onrender: function(){
					manager.loadProperties(this, "complainOut", "../../");
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
					/*oeeChart1.init(lineName);
					oeeChart2.init(lineName, oeeobj.currYear);
					oeeChart3.init(lineName, oeeobj.currYear, oeeobj.currMonth);*/
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
					$(e.node).hide().prev().show();//.text($(e.node).find("option:selected").text());
					
				},
				toShowMonthSelect:function(e){
					$(e.node).hide().next().show().focus();	
				},
				toHideMonthSelect:function(e){
					var _$select = $(e.node);
					_$select.hide().prev().show();//.text(_$select.find("option:selected").text());
				},
				changeYear:function(){
				/*	oeeChart1.init(lineName);
					oeeChart2.init(lineName, oeeobj.currYear);
					oeeChart3.init(lineName, oeeobj.currYear, oeeobj.currMonth);*/
				},
				changeMonth:function(){
					/*oeeChart1.init(lineName);
					oeeChart3.init(lineName, oeeobj.currYear, oeeobj.currMonth);*/
				},
			})
		});		
	}
	

	
	
	return {
		init:init
	}
}();
//$(document).ready(complainOut.init);