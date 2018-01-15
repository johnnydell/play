var safetyChart2 = function(){
	var months;
	
	var targetTotal;
	var actualTotal;
	function init(lineName, currYear){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/board2/safetyChart2.html", function (template) {
	        var ractive2 = new Ractive({
	            el: '.cxt .top .rgt',
	            data:{root:manager.root},
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "safety", "../../");
					manager.loadProperties(this, "common", "../../");
				},
	            oncomplete: function(){
	           		
	            	$.ajax({
	        			url		: manager.root + '/report/safety/montlySafetyChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{lineName:lineName,yearValue:currYear},
	        			contentType: "application/json",
	        			success: function(listdata)
	        			{
	        				console.log(listdata);
	        				months 				= listdata.monthList;
	        				targetTotal 		= listdata.targetTotal;
	        				actualTotal 		= listdata.actualTotal;
	        				
	        				//plot to chart
	        				bindChart();
	        				
	        				//plot to table
	        				ractive2.set("months", months);
	        				ractive2.set("targetTotal", targetTotal);
	        				ractive2.set("actualTotal", actualTotal);
	        			}
	            	});
	            }
	        }); 
	    });
	}
	
	function bindChart(){
		$('.top .rgt .chart .chart').highcharts({
			 title: {
	            text: ''
	        },
	        legend: {
	            enabled: false
	        },
	        xAxis: {
	            categories: months
	        },
	        yAxis: {
	            title: {
	                text: $.i18n.map['i18n_safety_monthly_count'],
	                margin:65,
	                style: {
	                	fontSize: '15px',
	                	fontWeight:'bold',
	                	color:'black'
	                }
	            },
	            
	            labels: {
	                formatter: function() {
	                    return this.value;
	                },
	            }	
	        },
	        plotOptions: {
	            series: {
	                stacking: 'normal'
	            }
	        },
	        series: [ {
	            type: 'column',
	            name: $.i18n.map['i18n_actual'],
	            data: actualTotal,
	            color:'#3C3C4D'
	        },{
	            type: 'spline',
	            name: $.i18n.map['i18n_target'],
	            color:'red',
	            data: targetTotal,
	            marker: {
	                enabled: false
	            }
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