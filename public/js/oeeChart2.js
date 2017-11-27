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
	            categories: ['1', ' 2', '3', '4', '5', '6', ' 7', '8', '9', '10', '11', '12']
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
	        series: [{
	            type: 'column',
	            name: 'OEE - actual',
	            data: [10, 20, 30, 40, 50]
	        }, {
	            type: 'spline',
	            name: 'OEE - target',
	            color:'red',
	            data: [20, 20, 20, 20, 20],
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