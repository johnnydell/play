var oeeChart3 = function(){
	var dayList; 
	var targetList; 
	var actualList;
	
	var actualData = [];
	function init(lineName, curYear, curMonth){
	   //渲染chart3部分
	   $.get(manager.root+"/views/tpl/board/oeeChart3.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .bt',
	            data:{root:manager.root},
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "common", "../../");
				},
	            oncomplete: function(){
	            	var totalDays = cntDays(curYear, curMonth);
	            	$.ajax({
	        			url		: manager.root + '/report/oee/dailyOeeChart',
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
	        				//try to make actual target series for chart
	        				for(i = 0; i < actualList.length; i ++){
	        					var tmpData = {};
	        					tmpData.y = actualList[i];
	        					
	        					if (tmpData.y > targetList[i])
	        						tmpData.color = 'green';
	        					else
	        						tmpData.color = 'red';
	        					
	        					actualData.push(tmpData);
	        				}
	        				
	        				//plot to chart
	        				bindChart();
	        				
	        				//plot to table
	        				ractive.set("targetList", targetList);
	        				ractive.set("actualList", actualList);
	        				
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
		$('.bt .chart').highcharts({
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
		            text: ''
		        },
		        tickPositions: [0, 10, 20, 30,40,50,60,70,80,90,100], // 指定竖轴坐标点的值
		        labels: {
		            formatter: function() {
		                return this.value + '%';
		            },
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