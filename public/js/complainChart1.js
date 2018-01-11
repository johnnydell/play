var complainChart1 = function(){
	var y_tick = [0,50,100,150,200,250,300,350,400,450,500];
	var years = [2015,2016,2017,2018]; 
	var targets = []; //目标
	var actuals = []; //合计
	var type1 = [];//总装
	var type2 = [];//GP12
	var type3 = [];//客户代表
	function init(base){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/board2/complainChart1.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .lft',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	            	manager.loadProperties(this, "complainOut", "../../");
	            	targets = [150,50,50,50]; //目标
	            	actuals = [150,50,50,50]; //合计
	            	type1 = [150,50,50,50];//总装
	            	type2 = [150,50,50,50];//GP12
	            	type3 = [150,50,50,50];//客户代表
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