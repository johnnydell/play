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
	            	months = [$.i18n.prop("i18n_month_Jan")
	             	         ,$.i18n.prop("i18n_month_Feb")
	             	         ,$.i18n.prop("i18n_month_Mar")
	             	         ,$.i18n.prop("i18n_month_Apr")
	             	         ,$.i18n.prop("i18n_month_May")
	             	         ,$.i18n.prop("i18n_month_June")
	             	         ,$.i18n.prop("i18n_month_July")
	             	         ,$.i18n.prop("i18n_month_Aug")
	             	         ,$.i18n.prop("i18n_month_Sept")
	             	         ,$.i18n.prop("i18n_month_Oct")
	             	         ,$.i18n.prop("i18n_month_Nov")
	             	         ,$.i18n.prop("i18n_month_Dec")]; 
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
	            text: $.i18n.prop("i18n_oeeLoss_tech_loss")
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
	            name: $.i18n.prop("i18n_oeeLoss_debug_loss"),
	            data: adjustment_loss_total,
	            color:'blue'
	        }, {
	            name: $.i18n.prop("i18n_oeeLoss_equ_stop_loss"),
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