var complainChart3 = function(){
	var y_tick = [0,50,100,150,200,250,300,350,400,450,500];
	var days; 
	var targets = []; //目标
	var actuals = []; //合计
	var accumus = []; //累计
	var type1 = [];//总装
	var type2 = [];//GP12
	var type3 = [];//客户代表
	var base;
	function init(_base){
	   //渲染chart3部分
	   $.get(manager.root+"/views/tpl/board2/complainChart3.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .bt',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	            	manager.loadProperties(this, "complainOut", "../../");
	            	base = _base;
	            	days = formDaysBasic(base.year,base.month);
	            	formData();
     				bindChart();
    				ractive.set("targets", targets);
    				ractive.set("actuals", actuals);
    				ractive.set("accumus", accumus);
    				ractive.set("type1", type1);
    				ractive.set("type2", type2);
    				ractive.set("type3", type3);
	            }
	        }); 
	    });
	}
	
	//根据年月返回所有天对象
	function formDaysBasic(year,month){
		var days = [];
		var daysCnt = manager.getDaysCnt(year,month);
		for(i = 1;i <= daysCnt;i++){
			days.push(i);
		}
		return days;
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
	
	function getCurrentMonthDaysHC(line_id,year,month,daysCnt){
		var ret;
		$.ajax({
			url: manager.root + "/complain/getHCDaysActuals",
			type: "GET",
			async:false,
			dataType:"json",
			data:{line_id:line_id,year:year,month:month,daysCnt:daysCnt},
			contentType: "application/json",
			success: function(data) {
				ret = data;
			}
		});	
		return ret; 
	}
	
	function formData(){
		var info = getComplainInfo(base.line_id,base.year,base.month);
		base.id = info.id;		
		var daysCnt = cntDays(base.year,base.month);
		base.daysCnt = daysCnt;
		base.days = formDays(base.year,base.month,"0");	
		var types = [];
		var hc = getCurrentMonthDaysHC(base.line_id,base.year,base.month,daysCnt);
		base.hc = hc;
    	targets = []; //目标
    	actuals = []; //合计
    	accumus = []; //累计
    	type1 = [];//总装
    	type2 = [];//GP12
    	type3 = [];//客户代表
		if(base.id != '0'){
			var type_id = "0";
			var days = [];
			$(info.complainActualDays).each(function(i,n){
				  if(type_id != n.typeId){
					  type_id = n.typeId;
					  days = [];
					  types.push({
							type_id:type_id,
							days:days
					  });
				  }
				  days.push(parseInt(n.dayVal == ''?'0':n.dayVal));
			})			
			type1 = types[0].days;
			type2 = types[1].days;
			type3 = types[2].days;
			//增加统计2行
			actuals = formDays(base.year,base.month); //合计
			accumus = formDays(base.year,base.month); //累计
			//对2行进行统计
			var input_total = 0;
			var hc_total = 0;
		    for(i = 0;i<=base.days.length-1;i++){
		    	var c_total = 0;
		    	var type1_v = type1[i];
		    	var type2_v = type2[i];
		    	var type3_v = type3[i];
		    	c_total += (parseInt(type1_v == '' ? '0':type1_v) + parseInt(type2_v == '' ? '0':type2_v) + parseInt(type3_v == '' ? '0':type3_v));
		    	
		    	var hc_v = base.hc[i];
		    	actuals[i] = (hc_v == '0' ? '0' : (c_total/hc_v).toFixed(2));
		    	
		    	input_total += c_total;
		    	hc_total += hc_v;
		    	accumus[i] = (hc_total == '0' ? '0':(input_total/hc_total).toFixed(2));
		    }
			//封装目标行
			$(info.complainTargetDays).each(function(i,n){
				targets.push(parseInt(n.dayVal == ''?'0':n.dayVal));
			})
		} else {
			targets = formDays(base.year,base.month); //目标
			actuals = formDays(base.year,base.month); //合计
			accumus = formDays(base.year,base.month); //累计
			type1 = formDays(base.year,base.month);//总装
			type2 = formDays(base.year,base.month);//GP12
			type3 = formDays(base.year,base.month);//客户代表 
		}
	}
	
	//根据年月返回天数
	function cntDays(year,month){
		return manager.getDaysCnt(year,month);
	}
	
	//根据年月返回所有天对象
	function formDays(year,month){
		var days = [];
		var daysCnt = cntDays(year,month);
		for(i = 1;i <= daysCnt;i++){
			days.push(0);
		}
		return days;
	}
	
	function bindChart(){
		$('.bt .chart').highcharts({
		    title: {
		        text: ''
		    },
		    legend: {
		        enabled: false
		    },
		    xAxis: {
		    	tickInterval: 1,
		        categories: days
		    },
		    yAxis: {
		    	title: {
	                text: $.i18n.prop("i18n_complainOut_day_ppm"),
	                margin:65,
	                style: {
	                	fontSize: '15px',
	                	fontWeight:'bold',
	                	color:'black'
	                }
	            },
		        tickPositions : y_tick,
		        labels: {
		            formatter: function() {
		                return this.value;
		            },
		        }	
		    },
		    plotOptions: {
	            series: {
	                stacking: 'normal'
	            }
	        },
		    series: [{
	            type: 'column',
	            name: $.i18n.prop("i18n_complainOut_actual"),
	            data: actuals,
	            color:'#17375e'
	        },
	     /*   {
	            type: 'column',
	            name: '来自总装',
	            data: type1,
	            color:'#9abb59'
	        }, {
	            type: 'column',
	            name: '来自GP12',
	            data: type2,
	            color:'#c00000'
	        }, {
	            type: 'column',
	            name: '来自客户代表',
	            data: type3,
	            color:'#1e497d'
	        }, */
	        {
	            type: 'spline',
	            name: $.i18n.prop("i18n_complainOut_target"),
	            color:'red',
	            data: targets,
	            marker: {
	                enabled: false
	            }
	        }
	       /* , {
	            type: 'column',
	            name: $.i18n.prop("i18n_complainOut_accumu"),
	            color:'bule',
	            data: accumus
	        }*/
	        ],
		    credits:{
		        enabled:false
		    }
	    });	
	}	
		
	return {
		init:init
	}
}();