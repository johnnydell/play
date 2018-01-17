var oeeChart1 = function(){
	var years = []; 
	var targetPercent = [];
	var actualPercent = [];
	var actualData = [];
	function init(lineName, curYear){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/board/oeeChart1.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .lft',
	            data:{root:manager.root},
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "common", "../../");
				},
	            oncomplete: function(){
	            	/**/
	            	$.ajax({
	        			url		: manager.root + '/report/oee/yearlyOeeChart',
	        			type	: 'GET',
	        			data	:{lineName:lineName,yearValue:curYear},
	        			dataType:"json",
	        			success: function(listdata)
	        			{
	        				years 			= listdata.yearList;
	        				targetList 		= listdata.targetTotal;
	        				actualList 		= listdata.actualTotal;
	        				targetPercent 	= listdata.targetPercent;
	        				actualData 		= [];
	        				actualPercent	= [];
	        				
	        				for(i = 0; i < targetList.length; i ++){
	        					
	        					var tmpData = {};
	        					var _actual = actualList[i];
	        					var _target = targetList[i];
	        					var _data = 0;
	        					//calculate actual OEE percentage
	        					if (manager.isNull(targetList[i]) || targetList[i] == 0 ){
	        						actualPercent.push(0);
	        						_data = 0;
	        					}
	        					else{
	        						_data = Math.ceil((actualList[i] / targetList[i]) * 100);
	        						actualPercent.push(_data);
	        					}
	        					tmpData.y = _data;
	        					
	        					if (_actual > _target)
	        						tmpData.color = 'green';
	        					else
	        						tmpData.color = 'red';
	        					actualData.push(tmpData);
	        				}
	        				bindChart();
	        				ractive.set("targetTotal", targetPercent);
	        				ractive.set("actualTotal", actualPercent);
	        			}
	            	});
	           		
	            }
	        }); 
	    });
	}
	
	function bindChart(){
		$('.top .lft .chart').highcharts({
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