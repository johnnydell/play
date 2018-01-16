var scrapChart2 = function(){
	var months = []; 
	var scrapList = []; 
	var actualList = [];
	var actualData = [];
	var targetList = [];
	var realScrapList = [];
	function init(lineName, currYear){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/board2/scrapChart2.html", function (template) {
	        var ractive2 = new Ractive({
	            el: '.cxt .top .rgt',
	            data:{
	            	root:manager.root,
    				format		: function(num){
    					return manager.formatNumberAsUS(num,0,',');
    				},
    			},
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "safety", "../../");
					manager.loadProperties(this, "common", "../../");
				},
	            oncomplete: function(){
	           		
	            	$.ajax({
	        			url		: manager.root + '/report/scrap/monthlyScrapChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{lineName:lineName,yearValue:currYear},
	        			contentType: "application/json",
	        			success: function(listdata)
	        			{
	        				actualData 		= [];
	        				targetList 		= [];
	        				realScrapList 	= [];
	        				console.log(listdata);
        					months 			= listdata.monthList;
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
	        				ractive2.set("targetTotal", targetList);
	        				ractive2.set("actualTotal", realScrapList);
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
	                text: $.i18n.map['i18n_ppm'],
	                margin:65,
	                style: {
	                	fontSize: '15px',
	                	fontWeight:'bold',
	                	color:'black'
	                }
	            },
	            tickPositions: [0,2000,4000,6000,8000,10000], // 指定竖轴坐标点的值
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