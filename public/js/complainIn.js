var complainIn = function(){
	var base = {};
    var actual = [];
    var target = {};
    var years = manager.years();
	var months = manager.months;
	var limits = permission.load("complain");
	var lines = complain.lines;
	var lineId = manager.getPV("lineId");
	function init(){
		$.get(manager.root+"/views/tpl/board/complainIn.html", function (template) {
			var ractive = new Ractive({
				el: ".maincontent",
				template: template,
				data: {root:manager.root},
				onrender: function(){
					manager.loadProperties(this, "complainIn", "../../");
					manager.loadProperties(this, "common", "../../");
					this.set("years",years);
					this.set("months",months);
					this.set("lines",lines);
					base.id = "0";
					base.line_id = lineId;
					var sys_date = manager.getSystemDate();
					base.year = sys_date.split("-")[0];
					base.month = sys_date.split("-")[1];
					
					//var attendee = {id:"0",checked:false,meeting_attendee:"",required:"R",frequency:"",dept:"",days:formDays(attendance.year,attendance.month),updated:"0"};
					//var actual = [{type_id:"0",days:[{id:'0',d:'1',v:'10'},{},{}]},{}];
					refreshComplain();
					this.set("base",base);
				},
				oncomplete: function(){}
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
				changeLine:function(){
					refreshComplain();
					this.set("base",base);
				},
				changeYear:function(){
					refreshComplain();
					this.set("base",base);
				},
				changeMonth:function(){
					refreshComplain();
					this.set("base",base);
				},
				test:function(){
					
				}
			})
	    });
	}
	
	//根据产线和年月获得对应的投诉记录
	function getComplainInfo(line_id,year,month){
		var ret;
		$.ajax({
			url: manager.root + "/complain/getComplainInfo",
			type: "GET",
			async:false,
			dataType:"json",
			data:{line_id:line_id,year:year,month:month},
			contentType: "application/json",
			success: function(data) {
				ret = data;
			}
		});	
		return ret; 
	}
	
	function refreshComplain(){
		var info = getComplainInfo(base.line_id,base.year,base.month);
		base.id = info.id;
		base.line_name = info.productLine.lineName;
		base.line_id = info.productLine.id;
		var daysCnt = cntDays(base.year,base.month);
		base.daysCnt = daysCnt;
		base.days = formDays(base.year,base.month,"0");	
	}
	
	//根据年月返回天数
	function cntDays(year,month){
		return manager.getDaysCnt(year,month);
	}
	
	//根据年月返回所有天对象
	function formDays(year,month,type_id){
		var days = [];
		var daysCnt = cntDays(year,month);
		for(i = 1;i <= daysCnt;i++){
			days.push({id:"0",type_id:type_id,d:i,v:"0"});
		}
		return days;
	}
	
	return {
		init:init
	}
}();
