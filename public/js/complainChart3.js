var complainChart3 = function(){
	var y_tick = [0,50,100,150,200,250,300,350,400,450,500];
	var days; 
	var targets = []; //目标
	var actuals = []; //合计
	var accumus = []; //累计
	var type1 = [];//总装
	var type2 = [];//GP12
	var type3 = [];//客户代表
	function init(lineName, year, month){
	   //渲染chart3部分
	   $.get(manager.root+"/views/tpl/board2/complainChart3.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .bt',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	            	days = formDays(year,month);
    				targets = [150,50,50,50,150,50,50,50,150,50,50,50,150,50,50,50,150,50,50,50,150,50,50,50,50,50,50,150,50,50,50]; //目标
    				actuals = [150,50,50,50,150,50,50,50,150,50,50,50,150,50,50,50,150,50,50,50,150,50,50,50,50,50,50,150,50,50,50]; //合计
    				accumus = [150,50,50,50,150,50,50,50,150,50,50,50,150,50,50,50,150,50,50,50,150,50,50,50,50,50,50,150,50,50,50]; //累计
    				type1 = [150,50,50,50,150,50,50,50,150,50,50,50,150,50,50,50,150,50,50,50,150,50,50,50,50,50,50,150,50,50,50];//总装
    				type2 = [150,50,50,50,150,50,50,50,150,50,50,50,150,50,50,50,150,50,50,50,150,50,50,50,50,50,50,150,50,50,50];//GP12
    				type3 = [150,50,50,50,150,50,50,50,150,50,50,50,150,50,50,50,150,50,50,50,150,50,50,50,50,50,50,150,50,50,50];//客户代表    
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
	function formDays(year,month){
		var days = [];
		var daysCnt = manager.getDaysCnt(year,month);
		for(i = 1;i <= daysCnt;i++){
			days.push(i);
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
	                text: '每天质量抱怨[PPM]',
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
	            name: '实际',
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
	            data: type3,
	            color:'#1e497d'
	        }, {
	            type: 'spline',
	            name: '目标',
	            color:'red',
	            data: targets,
	            marker: {
	                enabled: false
	            }
	        }, {
	            type: 'column',
	            name: '累计',
	            color:'bule',
	            data: accumus
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