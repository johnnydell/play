var oeeChart2 = function(){
	function init(){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/board/oeeChart2.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .rgt',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	           		bindChart();
	            }
	        }); 
	    });
	}
	
	function bindChart(){
		$('.top .rgt .chart').highcharts({
			 title: {
	            text: ''
	        },
	        legend: {
	            enabled: false
	        },
	        xAxis: {
	            categories: ['1', '2', '3', '4', '5','6', '7', '8', '9', '10','11','12']
	        },
	        yAxis: {
	            title: {
	                text: ''
	            },
	            tickPositions: [0,20,40,60,80,100], // 指定竖轴坐标点的值
	            labels: {
	                formatter: function() {
	                    return this.value + '%';
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
	            name: 'Performance/Undefined losses',
	            data: [10, 5, 10, 10, 5,0,0,0,0,0,0,0],
	            color:'#FF8000'
	        }, {
	            type: 'column',
	            name: 'Quality losses',
	            data: [10, 5, 10, 5, 5,0,0,0,0,0,0,0],
	            color:'#D6A40E'
	        }, {
	            type: 'column',
	            name: 'Organizational losses',
	            data: [10, 10, 15, 10, 5,0,0,0,0,0,0,0],
	            color:'#037C5E'
	        }, {
	            type: 'column',
	            name: 'Technical losses',
	            data: [10, 10, 15, 10, 5,0,0,0,0,0,0,0],
	            color:'#1D0E5C'
	        }, {
	            type: 'column',
	            name: 'Changeover losses',
	            data: [10, 10, 10, 10, 20,0,0,0,0,0,0,0],
	            color:'#98A398'
	        }, {
	            type: 'column',
	            name: 'OEE-actual',
	            data: [50, 60, 40, 55, 60,0,0,0,0,0,0,0],
	            color:'#41FB4A'
	        },{
	            type: 'spline',
	            name: 'OEE-target',
	            color:'red',
	            data: [70, 70, 70, 70, 70],
	            marker: {
	                enabled: false
	            }
	        }, {
	            name: '降雨误差',
	            type: 'errorbar',
	            yAxis: 0,
	            data: [[65, 70], [65, 73], [68, 75], [66, 80], [60, 71]],
	            tooltip: {
	                pointFormat: '(误差范围: {point.low}-{point.high} mm)<br/>'
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