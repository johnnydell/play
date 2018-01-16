var productivityChart2 = function(){
	var months;
	var targetList; 
	var actualList;
	var actualData = [];
	function init(lineName, currYear){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/kpi/productivityChart2.html", function (template) {
	        var ractive2 = new Ractive({
	            el: '.cxt .top .rgt',
	            data:{root:manager.root},
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "productivity", "../../../");
					manager.loadProperties(this, "common", "../../../");
				},
	            oncomplete: function(){
	           		
	            	$.ajax({
	        			url		: manager.root + '/report/productivity/monthlyProductivityChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{lineName:lineName,yearValue:currYear},
	        			contentType: "application/json",
	        			success: function(listdata)
	        			{
	        				actualData 		= [];
	        				months 			= listdata.monthList;
	        				targetList 		= listdata.targetTotal;
	        				actualList 		= listdata.actualTotal;
	        				for(i = 0; i < actualList.length; i ++){
	        					var tmpData = {};
	        					tmpData.y = actualList[i];
	        					var marker = {};
	        					if (tmpData.y > targetList[i])
	        						tmpData.color = 'green';
	        					else
	        						tmpData.color = 'red';
	        					
	        					actualData.push(tmpData);
	        				}
	        				//plot to chart
	        				bindChart();
	        				
	        				//plot to table
	        				ractive2.set("months", months);
	        				ractive2.set("targetTotal", targetList);
	        				ractive2.set("actualTotal", actualList);
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
	                text: $.i18n.map['i18n_productivity_monthly'],
	                margin:65,
	                style: {
	                	fontSize: '15px',
	                	fontWeight:'bold',
	                	color:'black'
	                }
	            },
	            
	            labels: {
	                formatter: function() {
	                    return (this.value * 1).toFixed(2);
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
	            data: actualData,
	            color:'#3C3C4D'
	        },{
	            type: 'spline',
	            name: $.i18n.map['i18n_target'],
	            color:'red',
	            data: targetList,
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