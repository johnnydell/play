var safetyChart3 = function(){
	var dayList; 
	var targetList; 
	var actualList;
	
	var actualData = [];
	function init(lineName, curYear, curMonth){
	   //渲染chart3部分
	   $.get(manager.root+"/views/tpl/board2/safetyChart3.html", function (template) {
	        var ractive4 = new Ractive({
	            el: '.cxt .bt',
	            data:{root:manager.root},
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "safety", "../../");
					manager.loadProperties(this, "common", "../../");
				},
	            oncomplete: function(){
	            	var totalDays = cntDays(curYear, curMonth);
	            	$.ajax({
	        			url		: manager.root + '/report/safety/dailySafetyChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{lineName:lineName,yearValue:curYear,monthValue:curMonth,dayCount:totalDays},
	        			contentType: "application/json",
	        			success: function(listdata)
	        			{
	        				dayList = null;
	        				targetList = null;
	        				actualList = null;
	        				actualData = [];
	        				dayList = listdata.dayList;
	        				targetList = listdata.targetList;
	        				actualList = listdata.actualList;
	        				
	        				
	        				
	        				//plot to chart
	        				bindChart();
	        				
	        				//plot to table
	        				ractive4.set("targetList", targetList);
	        				ractive4.set("actualList", actualList);
	        			}
	            	});
	           		
	            }
	        }); 
	    });
	}
	
	//根据年月返回天数
	function cntDays(year,month){
		return manager.getDaysCnt(year,month);
	}
	
	function bindChart(){
		$('.bt .chart .chart').highcharts({
			 title: {
		            text: ''
		        },
		        legend: {
		            enabled: false
		        },
		        xAxis: {
		            categories: dayList
		        },
		        yAxis: {
		            title: {
		                text: $.i18n.map['i18n_safety_daily_count'],
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
		            data: actualList,
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