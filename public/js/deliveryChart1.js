var deliveryChart1 = function(){
	var years = []; 
	var targetList = []; 
	var actualList = [];
	var actualData = [];
	var targetPercent = [];
	var actualPercent = [];
	function init(lineName, curYear){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/kpi/deliveryChart1.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .lft',
	            data:{
    				lineName	: lineName,
    				yearValue	: curYear,
    				format		: function(num){
    					return manager.formatNumberAsUS(num,0,',');
    				},
    				
    			},
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "delivery", "../../../");
					manager.loadProperties(this, "common", "../../../");
				},
	            oncomplete: function(){
	            	/**/
	            	targetPercent = [];
	            	$.ajax({
	        			url		: manager.root + '/report/delivery/yearlyDeliveryChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{lineName:lineName,yearValue:curYear},
	        			success: function(listdata)
	        			{
	        				actualData 		= [];
	        				targetPercent 	= [];
	        				actualPercent 	= [];
        					years 			= listdata.yearList;
	        				targetList 		= listdata.targetTotal;
	        				actualList 		= listdata.actualTotal;
	        				for(i = 0; i < actualList.length; i ++){
	        					//prepare series data - actual
	        					var tmpData = {};
	        					var _actual = actualList[i];
	        					var _target = targetList[i];
	        					if (manager.isNull(_actual) || manager.isNull(_target) || _target == 0 ){
	        						tmpData.y = 0;
	        						actualPercent.push(0);
	        					}
	        					else{
	        						var _percent = Math.round(_actual * 100/_target);
	        						tmpData.y = _percent;
	        						actualPercent.push(_percent);
	        					}
	        					
	        					var marker = {};
	        					if (_actual > _target)
	        						tmpData.color = 'green';
	        					else
	        						tmpData.color = 'red';
	        					
	        					actualData.push(tmpData);
	        					
	        					//prepare series data - target
	        					targetPercent.push(100);
	        				}
	        				
	        				
	        				//plot to chart
	        				bindChart();
	        				
	        				//plot to table
	        				ractive.set("targetTotal", targetList);
	        				ractive.set("actualTotal", actualList);
	        				ractive.set("targetPercent", targetPercent);
	        				ractive.set("actualPercent", actualPercent);
	        			}
	            	});
	           		
	            }
	        }); 
	    });
	}
	
	function bindChart(){
		$('.top .lft .chart .chart').highcharts({
			 title: {
	            text: ''
	        },
	        legend: {
	            enabled: false
	        },
	        xAxis: {
	            categories: years
	        },
	        yAxis: {
	            title: {
	                text: $.i18n.map['i18n_delivery_yearly'],
	                margin:65,
	                style: {
	                	fontSize: '15px',
	                	fontWeight:'bold',
	                	color:'black'
	                }
	            },
	            tickPositions: [0, 10,  20,  30,  40,  50, 60, 70, 80, 90, 100], // 指定竖轴坐标点的值
	            labels: {
	                formatter: function() {
	                    return this.value + '%';
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
	            data: targetPercent,
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