var oeeChart1 = function(){
	function init(){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/board/oeeChart1.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .lft',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	           		bindChart();
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
	            categories: ['2013', ' 2014', '2015', '2016', '2017']
	        },
	        yAxis: {
	            title: {
	                text: ''
	            },
	            tickPositions: [0, 10, 20, 30,40,50,60,70,80,90,100], // 指定竖轴坐标点的值
	            labels: {
	                formatter: function() {
	                    return this.value + '%';
	                },
	            }	
	        },
	        series: [{
	            type: 'column',
	            name: 'OEE - actual',
	            data: [90, 80, 88, 89, 82],
	            color:'#3C3C4D'
	        }, {
	            type: 'spline',
	            name: 'OEE - target',
	            color:'red',
	            data: [80, 80, 80, 80, 80],
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