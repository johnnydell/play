var deliverySummaryChart3 = function(){
	var days = []; 
	var chart_day;
	function init(curYear, curMonth){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/kpi/deliverySummaryChart3.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .bt',
	            data:{root:manager.root},
	            template: template,
	            oninit: function(){
	            	manager.loadProperties(this, "delivery", "../../../");
	            	manager.loadProperties(this, "common", "../../../");
	            },	 		
	            onrender: function(){
	            	bindChart();
	            },
	            oncomplete: function(){
	            	/**/
	            	totalDays = cntDays(curYear, curMonth);
	            	
	            	$.ajax({
	        			url		: manager.root + '/report/delivery/dailyDeliverySummaryChart',
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
	        					chart_day.addSeries(_tmp);
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
	        				
	        				chart_day.addSeries({name:'target',type:'spline',data:_targetList,color:'red'});
	        				
	        				//set categories
	        				chart_day.xAxis[0].setCategories(_cat);
	        				
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
		chart_day = new Highcharts.Chart({
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