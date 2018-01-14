var deliverySummaryChart2 = function(){
	var months = []; 
	
	function init(curYear){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/kpi/deliverySummaryChart2.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .rgt',
	            data:{root:manager.root},
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "delivery", "../../../");
					manager.loadProperties(this, "common", "../../../");
					bindChart();
				},
	            oncomplete: function(){
	            	
	            	$.ajax({
	        			url		: manager.root + '/report/delivery/monthlyDeliverySummaryChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{yearValue:curYear},
	        			success: function(listdata)
	        			{
	        				var brand_chart_2 = $('.top .rgt .chart .chart').highcharts();
	        				console.log("brand_chart_2 = " + brand_chart_2);
	        				months = listdata.monthList;
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
	        					brand_chart_2.addSeries(_tmp);
	        				}
	        				
	        				var _targetList = [];
	        				for(i = 0; i < months.length; i ++){
	        					_cat.push(months[i]);
	        					var _tmpTarget = 0;
	        					for (j = 0; j < dataList.length; j ++){
	        						_tmpTarget += parseInt(dataList[j].targetdata[i]);
	        					}
	        					_targetList.push(_tmpTarget);
	        				}
	        				//set target
	        				//targetList = [20.5,20.5,20.5,20.5,20.5,20.5,20.5,20.5,20.5,20.5,20.5,20.5];
	        				brand_chart_2.addSeries({name:'target',type:'spline',data:_targetList,color:'red'});
	        				
	        				//set categories
	        				brand_chart_2.xAxis[0].setCategories(_cat);
	        				
	        				//plot to table
	        				ractive.set("dataList", dataList);
	        				ractive.set("monthList", months);
	        				ractive.set("targetList", _targetList);
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