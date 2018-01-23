var oeeLossChart4 = function(){
	var scrap_loss_total;
	var rework_loss_total;
	function init(lineName, curYear){
	   //渲染chart4部分
	   $.get(manager.root+"/views/tpl/board/oeeLossChart4.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .rgt .qloss',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	            	$.ajax({
	        			url		: manager.root + '/report/oeeloss/monthlyQualityLossChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{lineName:lineName,yearValue:curYear},
	        			contentType: "application/json",
	        			success: function(listdata)
	        			{
	        				scrap_loss_total 	= listdata.scrap_loss_total;
	        				rework_loss_total 	= listdata.rework_loss_total;
	        				
	        				//plot to chart
	        				bindChart();
	        			}
	            	});
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
	            text: $.i18n.prop("i18n_oeeLoss_quality_loss")
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
	            name: $.i18n.prop("i18n_oeeLoss_scrap_loss"),
	            data: scrap_loss_total,
	            color:'red'
	        }, {
	            name: $.i18n.prop("i18n_oeeLoss_rework_loss"),
	            data: rework_loss_total,
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