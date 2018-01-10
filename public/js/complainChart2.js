var complainChart2 = function(){
	var years = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']; 
	var targetTotal = []; 
	var actualTotal = [150,50,50,50,150,50,50,50,150,50,50,50];
	function init(lineName, currYear){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/board2/complainChart2.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .rgt',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	            	bindChart();
    				ractive.set("targetTotal", targetTotal);
    				ractive.set("actualTotal", actualTotal);
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
	            categories: years
	        },
	        yAxis: {
	        	title: {
	                text: '月度质量抱怨[PPM]',
	                margin:65,
	                style: {
	                	fontSize: '15px',
	                	fontWeight:'bold',
	                	color:'black'
	                }
	            },
	            tickPositions: [0,50,100,150,200,250,300,350,400,450,500], // 指定竖轴坐标点的值
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
	            name: '实际',
	            data: [150,50,50,50,150,50,50,50,150,50,50,50],
	            color:'#17375e'
	        }, {
	            type: 'column',
	            name: '来自总装',
	            data: [50,150,50,50,50,150,50,50,50,150,50,50],
	            color:'#9abb59'
	        }, {
	            type: 'column',
	            name: '来自GP12',
	            data: [50,50,150,50,50,50,150,50,50,50,150,50],
	            color:'#c00000'
	        }, {
	            type: 'column',
	            name: '来自客户代表',
	            data: [50,50,50,150,50,50,50,150,50,50,50,150],
	            color:'#1e497d'
	        }, {
	            type: 'spline',
	            name: 'Target',
	            color:'red',
	            data: [50,50,150,50,50,50,150,50,50,50,150,50],
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