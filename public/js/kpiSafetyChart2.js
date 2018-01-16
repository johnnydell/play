var kpiSafetyChart2 = function(){
	var months = []; 
	var targetList = []; 
	var actualList = [];
	var actualData = [];
	
	function init(lineName, curYear){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/kpi/kpiSafetyChart2.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .rgt',
	            data:{
    				lineName	: lineName,
    				yearValue	: curYear,
    				format		: function(num){
    					return manager.formatNumberAsUS(num,0,',');
    				},
    				
    			},
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "safety", "../../../");
					manager.loadProperties(this, "common", "../../../");
				},
	            oncomplete: function(){
	            	/**/
	            	targetPercent = [];
	            	$.ajax({
	        			url		: manager.root + '/report/safety/monthlySafetyChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{
	        				lineName	: lineName,
	        				yearValue	: curYear
	        			},
	        			success: function(listdata)
	        			{
	        				actualData 		= [];
	        				
        					months 			= listdata.monthList;
	        				targetList 		= listdata.targetTotal;
	        				actualList 		= listdata.actualTotal;
	        				for(i = 0; i < actualList.length; i ++){
	        					//prepare series data - actual
	        					var tmpData = {};
	        					var _actual = actualList[i];
	        					var _target = targetList[i];
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
	        				ractive.set("targetTotal", targetList);
	        				ractive.set("actualTotal", actualList);
	        				
	        				
	        				
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
	                text: $.i18n.map['i18n_safety_yearly_count'],
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