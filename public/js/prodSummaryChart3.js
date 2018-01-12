var prodSummaryChart3 = function(){
	var dayList; 
	var targetList; 
	var actualList;
	
	var actualData = [];
	function init(curYear, curMonth){
	   //渲染chart3部分
	   $.get(manager.root+"/views/tpl/kpi/prodSummaryChart3.html", function (template) {
	        var ractive4 = new Ractive({
	            el: '.cxt .bt',
	            data:{root:manager.root},
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "productivity", "../../../");
					manager.loadProperties(this, "common", "../../../");
				},
	            oncomplete: function(){
	            	var totalDays = cntDays(curYear, curMonth);
	            	$.ajax({
	        			url		: manager.root + '/report/productivity/dailyProdSummaryChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{yearValue:curYear,monthValue:curMonth,dayCount:totalDays},
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
		                text: $.i18n.map['i18n_productivity_daily'],
		                margin:65,
		                style: {
		                	fontSize: '15px',
		                	fontWeight:'bold',
		                	color:'black'
		                }
		                	
		            },
		            tickPositions: [0,2,4,6,8,10,12], // 指定竖轴坐标点的值
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
		        series: [{
			        type: 'column',
			        name: $.i18n.map['i18n_actual'],
			        data: actualData,
			        color:'#3C3C4D'
			    }, {
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