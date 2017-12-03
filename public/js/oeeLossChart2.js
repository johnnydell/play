var oeeLossChart2 = function(){
	function init(){
	   //渲染chart2部分
	   $.get(manager.root+"/views/tpl/board/oeeLossChart2.html", function (template) {
	        var ractive = new Ractive({
	             el: '.cxt .top .lft .oloss',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	           		bindChart();
	            }
	        }); 
	    });
	}
	
	function bindChart(){
		$('.top .lft .oloss .chart').highcharts({
			chart: {
	            type: 'bar'
	        },
	        title: {
	            text: '组织损失'
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
	            tickPositions: [0, 100, 200, 300,400,500,600,700,800]// 指定竖轴坐标点的值
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
	            name: '其他损失',
	            data: [360, 300, 350, 100, 0,0,0,0,0,0,0,0],
	            color:'#4A7DBC'
	        },{
	            name: '新员工培训',
	            data: [0, 0, 0, 0, 0,0,0,0,0,0,0,0],
	            color:'#132F52'
	        },{
	            name: '非计划样品',
	            data: [0, 0, 0, 0, 0,0,0,0,0,0,0,0],
	            color:'#95B1DF'
	        },{
	            name: '非计划TPM损失',
	            data: [0, 0, 70, 0, 0,0,0,0,0,0,0,0],
	            color:'#7030A0'
	        },{
	            name: '更换原材料',
	            data: [300, 210, 210, 70, 0,0,0,0,0,0,0,0],
	            color:'#C0C0C0'
	        },{
	            name: '首末中间检查和放行',
	            data: [0, 0, 7, 0, 0,0,0,0,0,0,0,0],
	            color:'#929292'
	        }, {
	            name: '缺料',
	            data: [65, 8, 30, 30, 0,0,0,0,0,0,0,0],
	            color:'#AA0000'
	        }, {
	            name: '缺人',
	            data: [0, 15, 20, 0, 0,0,0,0,0,0,0,0],
	            color:'#7D9FC9'
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