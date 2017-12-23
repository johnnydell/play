var oeeChart2 = function(){
	var months;
	var qualityLossTotal;
	var technicalLossTotal;
	var changeoverLossTotal;
	var orgnizationLossTotal;
	var targetOeeTotal;
	var actualOeeTotal;
	function init(lineName, currYear){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/board/oeeChart2.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .rgt',
	            data:{root:manager.root},
	            template: template,
	            oncomplete: function(){
	           		//bindChart();
	            	$.ajax({
	        			url		: manager.root + '/report/oee/montlyOeeChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{lineName:lineName,yearValue:currYear},
	        			contentType: "application/json",
	        			success: function(listdata)
	        			{
	        				months 				= listdata.monthList;
	        				qualityLossTotal 	= listdata.qualityLossTotal;
	        				technicalLossTotal 	= listdata.technicalLossTotal;
	        				changeoverLossTotal = listdata.changeoverLossTotal;
	        				orgnizationLossTotal = listdata.orgnizationLossTotal;
	        				targetOeeTotal 		= listdata.targetOeeTotal;
	        				actualOeeTotal 		= listdata.actualOeeTotal;
	        				
	        				//plot to chart
	        				bindChart();
	        				
	        				//plot to table
	        				ractive.set("months", months);
	        				ractive.set("qualityLossTotal", qualityLossTotal);
	        				ractive.set("technicalLossTotal", technicalLossTotal);
	        				ractive.set("changeoverLossTotal", changeoverLossTotal);
	        				ractive.set("orgnizationLossTotal", orgnizationLossTotal);
	        				ractive.set("targetOeeTotal", targetOeeTotal);
	        				ractive.set("actualOeeTotal", actualOeeTotal);
	        			}
	            	});
	            }
	        }); 
	    });
	}
	
	function bindChart(){
		$('.top .rgt .chart').highcharts({
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
	                text: ''
	            },
	            tickPositions: [0,20,40,60,80,100], // 指定竖轴坐标点的值
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
	        series: [{
	            type: 'column',
	            name: 'Performance/Undefined losses',
	            data: [],
	            color:'#FF8000'
	        }, {
	            type: 'column',
	            name: 'Quality losses',
	            data: qualityLossTotal,
	            color:'#D6A40E'
	        }, {
	            type: 'column',
	            name: 'Organizational losses',
	            data: orgnizationLossTotal,
	            color:'#037C5E'
	        }, {
	            type: 'column',
	            name: 'Technical losses',
	            data: technicalLossTotal,
	            color:'#1D0E5C'
	        }, {
	            type: 'column',
	            name: 'Changeover losses',
	            data: changeoverLossTotal,
	            color:'#98A398'
	        }, {
	            type: 'column',
	            name: 'OEE-actual',
	            data: actualOeeTotal,
	            color:'#41FB4A'
	        },{
	            type: 'spline',
	            name: 'OEE-target',
	            color:'red',
	            data: targetOeeTotal,
	            marker: {
	                enabled: false
	            }
	        }, {
	            name: '降雨误差',
	            type: 'errorbar',
	            yAxis: 0,
	            //data: [[65, 70], [65, 73], [68, 75], [66, 80], [60, 71]],
	            data: [],
	            tooltip: {
	                pointFormat: '(误差范围: {point.low}-{point.high} mm)<br/>'
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