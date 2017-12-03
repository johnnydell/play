var oeeLossChart5 = function(){
	function init(){
	   //渲染chart5部分
	   $.get(manager.root+"/views/tpl/board/oeeLossChart5.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .rgt .ploss',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	           		bindChart();
	            }
	        }); 
	    });
	}
	
	function bindChart(){
		$('.top .rgt .ploss .chart').highcharts({
		     chart: {
	            type: 'bar'
	        },
	        title: {
	            text: '绩效损失'
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
	            tickPositions: [0, 2, 4, 6,8,10,12]// 指定竖轴坐标点的值
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
	            data: [0, 0, 0, 0, 0,0,0,0,0,0,0,0],
	            color:'red'
	        }, {
	            name: '设备停机损失',
	            data: [0, 10, 3, 0, 0,0,0,0,0,0,0,0],
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