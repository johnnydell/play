var oeeLossChart5 = function(){
	var performance_loss_total;
	var undefined_loss_total;
	function init(lineName, curYear){
	   //渲染chart5部分
	   $.get(manager.root+"/views/tpl/board/oeeLossChart5.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .rgt .ploss',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	            	$.ajax({
	        			url		: manager.root + '/report/oeeloss/monthlyPerformanceLossChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{lineName:lineName,yearValue:curYear},
	        			contentType: "application/json",
	        			success: function(listdata)
	        			{
	        				performance_loss_total 	= listdata.performance_loss_total;
	        				undefined_loss_total 	= listdata.undefined_loss_total;
	        				
	        				//plot to chart
	        				bindChart();
	        			}
	            	});
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
	            
	        },
	        legend: {
	        	layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            floating: false,
	            symbolRadius: 0
	        },
	        plotOptions: {
	            series: {
	                stacking: 'normal'
	            }
	        },
	        series: [{
	            name: '绩效损失',
	            data: performance_loss_total,
	            color:'red'
	        }, {
	            name: '未定义损失',
	            data: undefined_loss_total,
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