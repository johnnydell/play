var oeeLossChart1 = function(){
	var breakdown_loss_total;
	var adjustment_loss_total;
	function init(lineName, curYear){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/board/oeeLossChart1.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .lft .tloss',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	            	$.ajax({
	        			url		: manager.root + '/report/oeeloss/monthlyTechinicalLossChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{lineName:lineName,yearValue:curYear},
	        			contentType: "application/json",
	        			success: function(listdata)
	        			{
	        				breakdown_loss_total = listdata.breakdown_loss_total;
	        				adjustment_loss_total = listdata.adjustment_loss_total;
	        				//plot to chart
	        				bindChart();
	        			}
	            	});
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
	            name: '调试损失',
	            data: adjustment_loss_total,
	            color:'blue'
	        }, {
	            name: '设备停机损失',
	            data: breakdown_loss_total,
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