var prodSummaryChart1 = function(){
	var years = []; 
	var targetList = []; 
	var actualList = [];
	var actualData = [];
	function init(curYear){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/kpi/prodSummaryChart1.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .lft',
	            data:{root:manager.root},
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "productivity", "../../../");
					manager.loadProperties(this, "common", "../../../");
				},
	            oncomplete: function(){
	            	/**/
	            	$.ajax({
	        			url		: manager.root + '/report/productivity/yearlyProdSummaryChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{yearValue:curYear},
	        			success: function(listdata)
	        			{
	        				
	        				dataList = listdata.dataList;
	        				console.log(dataList);
	        				var serials;
	        				for(i = 0; i < dataList.length; i ++){
	        					var dataTmp = [];
	        					for (j = 0; j < dataList[i].length; j ++){
	        						
	        						var _tmp = {};
	        						_tmp.type='column';
	        						_tmp.name=dataList[i][j].lineName;
	        						var data = {};
	        						data.y = dataList[i][j].actualTotal;
	        						_tmp.data = data;
	        						dataTmp.push(_tmp);
	        					}
	        				}
	        				/*actualData 		= [];
        					years 			= listdata.yearList;
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
	        				bindChart();*/
	        				
	        				//plot to table
	        				ractive.set("dataList", dataList);
	        				
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
	                text: $.i18n.map['i18n_productivity_yearly'],
	                margin:65,
	                style: {
	                	fontSize: '15px',
	                	fontWeight:'bold',
	                	color:'black'
	                }
	            },
	            tickPositions: [0, 2,  4,  6,  8,  10, 12], // 指定竖轴坐标点的值
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