var kpiSafetySummaryChart1 = function(){
	var years = []; 
	
	function init(curYear){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/kpi/kpiSafetySummaryChart1.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .lft',
	            data:{root:manager.root},
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "safety", "../../../");
					manager.loadProperties(this, "common", "../../../");
					bindChart();
				},
	            oncomplete: function(){
	            	/**/
	            	
	            	$.ajax({
	        			url		: manager.root + '/report/safety/yearlySafetySummaryChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{yearValue:curYear},
	        			success: function(listdata)
	        			{
	        				var dataList = [];
	        				
	        				years = listdata.yearList;
	        				dataList = listdata.dataList;
	        				
	        				// Categories values
        					var _cat = [];
	        				var brand_chart = $('.top .lft .chart .chart').highcharts();
	        				console.log("brand_chart = " + brand_chart);
	        				for(i = 0; i < dataList.length; i ++){
	        					//set Series
	        					var _tmp = {};
	        					_tmp.type = 'column';
	        					var _datas = [];
	        					for(j = 0; j < dataList[i].actualdata.length; j ++){
	        						_datas.push(parseInt(dataList[i].actualdata[j]));
	        					}
	        					_tmp.data = _datas;
	        					_tmp.name = dataList[i].lineName;
	        					brand_chart.addSeries(_tmp);
	        					
	        				}
	        				var _targetList = [];
	        				for(i = 0; i < years.length; i ++){
	        					//set categories
	        					_cat.push(years[i]);
	        					//set target
	        					var _tmpTarget = 0;
	        					for (j = 0; j < dataList.length; j ++){
	        						_tmpTarget += parseInt(dataList[j].targetdata[i]);
	        					}
	        					_targetList.push(_tmpTarget);
	        				}
	        				
	        				brand_chart.addSeries({name:'target',type:'spline',data:_targetList,color:'red'});
	        				
	        				//set categories
	        				brand_chart.xAxis[0].setCategories(_cat);
	        				
	        				//plot to table
	        				ractive.set("dataList", dataList);
	        				ractive.set("yearList", years);
	        				ractive.set("targetList", _targetList);
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