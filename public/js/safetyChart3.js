var safetyChart3 = function(){
	var days = []; 
	var targetList = []; 
	var actualList = [];
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
	        				actualData 		= [];
        					days 			= listdata.dayList;
	        				targetList 		= listdata.targetTotal;
	        				actualList 		= listdata.actualTotal;
	        				for(i = 0; i < actualList.length; i ++){
	        					//prepare series data - actual
	        					var tmpData = {};
	        					_actual = actualList[i];
	        					_target = targetList[i];
        						tmpData.y = _actual;
	        					if (_actual < _target)
	        						tmpData.color = 'green';
	        					else
	        						tmpData.color = 'red';
	        					actualData.push(tmpData);
	        				}
	        				//plot to chart
	        				bindChart();
	        				
	        				//plot to table
	        				ractive4.set("targetTotal", targetList);
	        				ractive4.set("actualTotal", actualList);
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
		            categories: days
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