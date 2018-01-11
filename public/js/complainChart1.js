var complainChart1 = function(){
	var y_tick = [0,50,100,150,200,250,300,350,400,450,500];
	var years = [];
	var targets = []; //目标
	var actuals = []; //合计
	var type1 = [];//总装
	var type2 = [];//GP12
	var type3 = [];//客户代表
	var yearOffset = 3;
	var base;
	function init(_base){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/board2/complainChart1.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .lft',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	            	base = _base;
	            	years = manager.years(base.year,-1*yearOffset); 	            	
	            	manager.loadProperties(this, "complainOut", "../../");
	            	formData();
	            	bindChart();
	            	ractive.set("targets", targets);
    				ractive.set("actuals", actuals);
    				ractive.set("type1", type1);
    				ractive.set("type2", type2);
    				ractive.set("type3", type3);
	            }
	        }); 
	    });
	}
	
	function getHCYearsActuals(line_id,year){
		var ret;
		$.ajax({
			url: manager.root + "/complain/getHCYearsActuals",
			type: "GET",
			async:false,
			dataType:"json",
			data:{line_id:line_id,year:year,yearsCnt:yearOffset},
			contentType: "application/json",
			success: function(data) {
				ret = data;
			}
		});	
		return ret; 
	}
	
	function getYearlyTargets(line_id,year){
		var ret;
		$.ajax({
			url: manager.root + "/complain/getYearlyTargets",
			type: "GET",
			async:false,
			dataType:"json",
			data:{line_id:line_id,year:year,yearsCnt:yearOffset},
			contentType: "application/json",
			success: function(data) {
				ret = data;
			}
		});	
		return ret; 
	}
	
	function getYearlyTypes(line_id,year){
		var ret;
		$.ajax({
			url: manager.root + "/complain/getYearlyTypes",
			type: "GET",
			async:false,
			dataType:"json",
			data:{line_id:line_id,year:year,yearsCnt:yearOffset},
			contentType: "application/json",
			success: function(data) {
				ret = data;
			}
		});	
		return ret; 
	} 
	
	function formData(){
		var hc = getHCYearsActuals(base.line_id,base.year);
		targets = getYearlyTargets(base.line_id,base.year); //目标
		var typeData = getYearlyTypes(base.line_id,base.year);
		type1 = typeData[0];//总装
		type2 = typeData[1];//GP12
		type3 = typeData[2];//客户代表
		//计算合计
		for(i=0;i<=yearOffset;i++){
			var type1_v = type1[i];
			var type2_v = type2[i];
			var type3_v = type3[i];
			var c_total = (parseInt(type1_v == '' ? '0':type1_v) + parseInt(type2_v == '' ? '0':type2_v) + parseInt(type3_v == '' ? '0':type3_v));
			var hc_v = hc[i];
			actuals[i] = (hc_v == '0' ? '0' : (c_total/hc_v).toFixed(2));
		}
	}
	
	function bindChart(){
		$('.top .lft .chart').highcharts({
		    title: {
	            text: ''
	        },
	        legend: {
	            enabled: false
	        },
	        xAxis: {
	            categories: years
	        },
	        yAxis: {
	        	title: {
	                text: $.i18n.prop("i18n_complainOut_year_ppm"),
	                margin:65,
	                style: {
	                	fontSize: '15px',
	                	fontWeight:'bold',
	                	color:'black'
	                }
	            },
	            tickPositions: y_tick, // 指定竖轴坐标点的值
	            labels: {
	                formatter: function() {
	                    return this.value ;
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
	        }, {
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
	            data: type2,
	            color:'#1e497d'
	        }, {
	            type: 'spline',
	            name: $.i18n.prop("i18n_complainOut_target"),
	            color:'red',
	            data: targets,
	            marker: {
	                enabled: false
	            }
	        }],
	        credits:{
	            enabled:false
	        }
	    });	
	}
		
	return {
		init:init
	}
}();