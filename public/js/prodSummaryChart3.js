var prodSummaryChart3 = function(){
	var days = []; 
	
	function init(curYear, curMonth){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/kpi/prodSummaryChart3.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .bt',
	            data:{root:manager.root},
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "productivity", "../../../");
					manager.loadProperties(this, "common", "../../../");
					bindChart();
				},
	            oncomplete: function(){
	            	/**/
	            	totalDays = cntDays(curYear, curMonth);
	            	var brand_chart = $('.bt .chart .chart').highcharts();
	            	$.ajax({
	        			url		: manager.root + '/report/productivity/dailyProdSummaryChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{yearValue:curYear,monthValue:curMonth,dayCount:totalDays},
	        			success: function(listdata)
	        			{
	        				
	        				days = listdata.dayList;
	        				dataList = listdata.dataList;
	        				// Categories values
        					var _cat = [];
	        				
	        				for(i = 0; i < dataList.length; i ++){
	        					//set Series
	        					var _tmp = {};
	        					_tmp.type = 'column';
	        					var _datas = [];
	        					for(j = 0; j < dataList[i].actualdata.length; j ++){
	        						_datas.push(parseFloat(dataList[i].actualdata[j]));
	        					}
	        					_tmp.data = _datas;
	        					_tmp.name = dataList[i].lineName;
	        					brand_chart.addSeries(_tmp);
	        					
	        					_cat.push(days[i]);
	        					
	        					
	        				}
	        				//set target
	        				for(i = 0; i < totalDays; i ++){
	        					targetList.push(20.5);
	        				}
	        				
	        				brand_chart.addSeries({name:'target',type:'spline',data:targetList,color:'red'});
	        				
	        				//set categories
	        				brand_chart.xAxis[0].setCategories(_cat);
	        				
	        				//plot to table
	        				ractive.set("dataList", dataList);
	        				ractive.set("dayList", days);
	        				ractive.set("targetList", targetList);
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
		        	layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            floating: false,
		            symbolRadius: 0
		        },
		        xAxis: {
		            categories: []
		        },
		        yAxis: {
		            title: {
		                text: ''
		            },
		            tickPositions: [0,10,20,30,40,50], // 指定竖轴坐标点的值
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
		        series: [],
		        credits:{
		            enabled:false
		        }
		    });	
	}
	
		
	return {
		init:init
	}
}();