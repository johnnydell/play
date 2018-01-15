var safetyReport = function(){
	var lineName = manager.getPV("lineName");
	var lineId = manager.getPV("lineId");
	var safetyObj = {currYear:"", currMonth:""};
	var ractive = null;
	var sys_date = manager.getSystemDate();
	var years = manager.years();
	var months = manager.months;
	function init(){
		$.get(manager.root+"/views/tpl/board2/safetyReport.html", function (template) {
			 ractive = new Ractive({
		            el: '.content .maincontent',
		            data:{root:manager.root,lineName:lineName, lineId:lineId},
		            template: template,
		            onrender: function(){
						
						this.set("years",years);
						this.set("months",months);
						safetyObj.currYear = sys_date.split("-")[0];
						safetyObj.currMonth = sys_date.split("-")[1];
						this.set("safetyObj",safetyObj);
					},
		            oncomplete: function(){
		            	safetyChart1.init(lineName, safetyObj.currYear);
		            	safetyChart2.init(lineName, safetyObj.currYear);
		            	safetyChart3.init(lineName, safetyObj.currYear, safetyObj.currMonth);
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
						safetyChart1.init(lineName, safetyObj.currYear);
		            	safetyChart2.init(lineName, safetyObj.currYear);
		            	safetyChart3.init(lineName, safetyObj.currYear, safetyObj.currMonth);
					},
					changeMonth:function(){
						safetyChart1.init(lineName, safetyObj.currYear);
		            	safetyChart3.init(lineName, safetyObj.currYear, safetyObj.currMonth);
					},
				})
		});
	}
	

	
	
	return {
		init:init
	}
}();