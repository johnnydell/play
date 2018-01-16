var prodSummaryChart3 = function(){
	var days = []; 
	var chart_daily;
	function init(curYear, curMonth){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/kpi/prodSummaryChart3.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .bt',
	            data:{root:manager.root},
	            template: template,
	            oninit: function(){
	            	manager.loadProperties(this, "productivity", "../../../");
					manager.loadProperties(this, "common", "../../../");
	            },	 		
	            onrender: function(){
					
					bindChart();
				},
	            
	            oncomplete: function(){
	            	/**/
	            	totalDays = cntDays(curYear, curMonth);
	            	$.ajax({
	        			url		: manager.root + '/report/productivity/dailyProdSummaryChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{yearValue:curYear,monthValue:curMonth,dayCount:totalDays},
	        			success: function(listdata)
	        			{
	        				var targetList = [];
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
	        					chart_daily.addSeries(_tmp);
	        					
	        					_cat.push(days[i]);
	        					
	        					
	        				}
	        				//set target
	        				for(i = 0; i < totalDays; i ++){
	        					targetList.push(20.5);
	        				}
	        				
	        				chart_daily.addSeries({name:'target',type:'spline',data:targetList,color:'red'});
	        				
	        				//set categories
	        				chart_daily.xAxis[0].setCategories(_cat);
	        				
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
		console.log("chart3");
		chart_daily = new Highcharts.Chart({
			title: {
				text: ''
			},
			chart: { 
				renderTo: 'daily_chart', //设置显示的页面块
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