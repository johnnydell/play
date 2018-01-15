var kpiSafetySummaryChart3 = function(){
	var days = []; 
	
	function init(curYear, curMonth){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/kpi/kpiSafetySummaryChart3.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .bt',
	            data:{root:manager.root},
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "delivery", "../../../");
					manager.loadProperties(this, "common", "../../../");
					bindChart();
				},
	            oncomplete: function(){
	            	/**/
	            	totalDays = cntDays(curYear, curMonth);
	            	
	            	$.ajax({
	        			url		: manager.root + '/report/safety/dailySafetySummaryChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{yearValue:curYear,monthValue:curMonth,dayCount:totalDays},
	        			success: function(listdata)
	        			{
	        				var brand_chart_3 = $('.bt .chart .chart').highcharts();
	        				console.log("brand_chart_3 = " + brand_chart_3);
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
	        					brand_chart_3.addSeries(_tmp);
	        				}
	        				//set target
	        				var _targetList = [];
	        				for(i = 0; i < totalDays; i ++){
	        					
	        					_cat.push(i + 1);
	        					var _tmpTarget = 0;
	        					for (j = 0; j < dataList.length; j ++){
	        						_tmpTarget += parseInt(dataList[j].targetdata[i]);
	        					}
	        					_targetList.push(_tmpTarget);
	        				}
	        				
	        				brand_chart_3.addSeries({name:'target',type:'spline',data:_targetList,color:'red'});
	        				
	        				//set categories
	        				brand_chart_3.xAxis[0].setCategories(_cat);
	        				
	        				//plot to table
	        				ractive.set("dataList", dataList);
	        				ractive.set("dayList", days);
	        				ractive.set("targetList", _targetList);
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