var oeeLossChart3 = function(){
	function init(){
	   //渲染chart3部分
	   $.get(manager.root+"/views/tpl/board/oeeLossChart3.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .rgt .closs',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	           		bindChart();
	            }
	        }); 
	    });
	}
	
	function bindChart(){
		$('.top .rgt .closs .chart').highcharts({
		     chart: {
	            type: 'bar'
	        },
	        title: {
	            text: '换型损失'
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
	            tickPositions: [0, 200, 400, 600,800,1000,1200,1400,1600]// 指定竖轴坐标点的值
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
	            name: '非计划换型损失',
	            data: [300, 650, 110, 250, 0,0,0,0,0,0,0,0],
	            color:'#7D9FC9'
	        },{
	            name: '电极刀片工具更换',
	            data: [500, 300, 250, 300, 0,0,0,0,0,0,0,0],
	            color:'red'
	        }, {
	            name: '计划换型损失',
	            data: [800, 600, 500, 400, 0,0,0,0,0,0,0,0],
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