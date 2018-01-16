var kpiScrapChart3 = function(){
	var days = []; 
	var scrapList = []; 
	var actualList = [];
	var actualData = [];
	var targetList = [];
	var realScrapList = [];
	function init(lineName, curYear, curMonth){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/kpi/kpiScrapChart3.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .bt',
	            data:{
	            	root		: manager.root,
    				lineName	: lineName,
    				format		: function(num){
    					return manager.formatNumberAsUS(num,0,',');
    				},
    				
    			},
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "hourlycount", "../../../");
					manager.loadProperties(this, "common", "../../../");
				},
	            oncomplete: function(){
	            	/**/
	            	totalDays = cntDays(curYear, curMonth);
	            	$.ajax({
	        			url		: manager.root + '/report/scrap/dailyScrapChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{lineName:lineName,yearValue:curYear,monthValue:curMonth,dayCount:totalDays},
	        			success: function(listdata)
	        			{
	        				actualData 		= [];
	        				targetList 		= [];
	        				realScrapList 	= [];
        					days 			= listdata.dayList;
        					scrapList 		= listdata.scrapTotal;
	        				actualList 		= listdata.actualTotal;
	        				for(i = 0; i < actualList.length; i ++){
	        					
	        					//prepare data - target
	        					targetList.push(7000);
	        					
	        					//prepare series data - actual
	        					var tmpData = {};
	        					var _actual = actualList[i];
	        					var _scrap = scrapList[i];
	        					
	        					if (parseInt(_actual) == 0)
	        						tmpData.y = 0;
	        					else{
	        						tmpData.y = Math.round(_scrap * 1000000 / _actual);
	        					}
	        					realScrapList.push(tmpData.y);
	        					if (_actual > tmpData.y)
	        						tmpData.color = 'green';
	        					else
	        						tmpData.color = 'red';
	        					
	        					actualData.push(tmpData);
	        				}
	        				//plot to chart
	        				bindChart();
	        				
	        				//plot to table
	        				ractive.set("targetTotal", targetList);
	        				ractive.set("actualTotal", realScrapList);
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
	                text: $.i18n.map['i18n_delivery_daily'],
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