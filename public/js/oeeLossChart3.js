var oeeLossChart3 = function(){
	var plan_setup_loss_total;
	var unplan_setup_loss_total;
	var exchg_tool_loss_total;
	function init(lineName, curYear){
	   //渲染chart3部分
	   $.get(manager.root+"/views/tpl/board/oeeLossChart3.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .rgt .closs',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	            	$.ajax({
	        			url		: manager.root + '/report/oeeloss/monthlyChangeoverLossChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{lineName:lineName,yearValue:curYear},
	        			contentType: "application/json",
	        			success: function(listdata)
	        			{
	        				plan_setup_loss_total 		= listdata.plan_setup_loss_total;
	        				unplan_setup_loss_total 	= listdata.unplan_setup_loss_total;
	        				exchg_tool_loss_total 		= listdata.exchg_tool_loss_total;
	        				//plot to chart
	        				bindChart();
	        			}
	            	});
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
	            name: '非计划换型损失',
	            data: unplan_setup_loss_total,
	            color:'#7D9FC9'
	        },{
	            name: '电极刀片工具更换',
	            data: exchg_tool_loss_total,
	            color:'red'
	        }, {
	            name: '计划换型损失',
	            data: plan_setup_loss_total,
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