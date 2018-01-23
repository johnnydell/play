var prodSummaryChart2 = function(){
	var months = []; 
	var chart_monthly;
	function init(curYear){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/kpi/prodSummaryChart2.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .rgt',
	            data:{root:manager.root},
	            template: template,
	            oninit: function(){
	            	manager.loadProperties(this, "productivity", "../../../");
					manager.loadProperties(this, "common", "../../../");
	            },	 		
	            onrender: function(){
					
					bindChart2();
				},
				oncomplete: function(){

					$.ajax({
						url		: manager.root + '/report/productivity/monthlyProdSummaryChart',
						type	: 'GET',
						dataType:"json",
						data:{yearValue:curYear},
						success: function(listdata)
						{
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
								chart_monthly.addSeries(_tmp);

								_cat.push(months[i]);
							}
							//set target
							targetList = [20.5,20.5,20.5,20.5,20.5,20.5,20.5,20.5,20.5,20.5,20.5,20.5];
							chart_monthly.addSeries({name:'target',type:'spline',data:targetList,color:'red'});

							//set categories
							chart_monthly.xAxis[0].setCategories(_cat);

							//plot to table
							ractive.set("dataList", dataList);
							ractive.set("monthList", months);
							ractive.set("targetList", targetList);
						}
					});

				}
	        }); 
	    });
	}
	
	function bindChart2(){
		chart_monthly = new Highcharts.Chart({
			title: {
				text: ''
			},
			chart: { 
				renderTo: 'monthly_chart', //设置显示的页面块
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