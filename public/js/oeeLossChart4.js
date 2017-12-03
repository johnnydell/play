var oeeLossChart4 = function(){
	function init(){
	   //渲染chart4部分
	   $.get(manager.root+"/views/tpl/board/oeeLossChart4.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .rgt .qloss',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	           		bindChart();
	            }
	        }); 
	    });
	}
	
	function bindChart(){
		$('.top .rgt .qloss .chart').highcharts({
		     chart: {
	            type: 'bar'
	        },
	        title: {
	            text: '质量损失'
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
	            tickPositions: [0, 200, 400, 600,800,1000,1200]// 指定竖轴坐标点的值
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
	            data: [200, 150, 180, 350, 0,0,0,0,0,0,0,0],
	            color:'red'
	        }, {
	            name: '设备停机损失',
	            data: [800, 700, 650, 550, 0,0,0,0,0,0,0,0],
	            color:'#132F52'
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