var oeeLossChart1 = function(){
	function init(){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/board/oeeLossChart1.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .lft .tloss',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	           		bindChart();
	            }
	        }); 
	    });
	}
	
	function bindChart(){
		$('.top .lft .tloss .chart').highcharts({
		    chart: {
	            type: 'bar'
	        },
	        title: {
	            text: '技术损失'
	        },
	        xAxis: {
	            categories: ['Jan','Feb','Mar','Apr','May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
	            reversed: false,
	            labels: {
	                formatter: function() {
	                    var ret = this.value;
	                    switch(ret){
	                        case 'Feb':
	                        	ret = '';
	                        	break;
	                        case 'Apr':
	                        	ret = '';
	                        	break;
	                        case 'Jun':
	                        	ret = '';
	                        	break;
	                        case 'Aug':
	                        	ret = '';
	                        	break;
	                        case 'Oct':
	                        	ret = '';
	                        	break;
	                        case 'Dec':
	                        	ret = '';
	                        	break;
	                    }
	                    return ret;
	                },
	            }
	        },
	        yAxis: {
	            title: {
	                text: ''
	            },
	            min: 0,
	            tickPositions: [0, 500, 1000, 1500,2000,2500,3000,3500]// 指定竖轴坐标点的值
	        },
	        legend: {
	            enabled: false
	        },
	        plotOptions: {
	            series: {
	                stacking: 'normal'
	            }
	        },
	        series: [{
	            name: '调试损失',
	            data: [900, 500, 850, 250, 0,0,0,0,0,0,0,0],
	            color:'blue'
	        }, {
	            name: '设备停机损失',
	            data: [2000, 1400, 1950, 400, 0,0,0,0,0,0,0,0],
	            color:'red'
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