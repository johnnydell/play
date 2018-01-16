var kpiScrapSummaryChart1 = function(){
	var years = []; 
	var chart_year;
	function init(curYear){
		//渲染chart1部分
		$.get(manager.root+"/views/tpl/kpi/kpiScrapSummaryChart1.html", function (template) {
			var ractive = new Ractive({
				el: '.cxt .top .lft',
				data:{root:manager.root},
				template: template,
				oninit: function(){
					manager.loadProperties(this, "hourlycount", "../../../");
					manager.loadProperties(this, "common", "../../../");
				},	 		
				onrender: function(){
					bindChart();
				},
				oncomplete: function(){

					$.ajax({
						url		: manager.root + '/report/scrap/yearlyScrapSummaryChart',
						type	: 'GET',
						dataType:"json",
						data:{yearValue:curYear},
						success: function(listdata)
						{
							var dataList = [];
							console.log(listdata);
							years = listdata.yearList;
							dataList = listdata.dataList;

							// Categories values
							var _cat = [];

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
								chart_year.addSeries(_tmp);

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

							chart_year.addSeries({name:'target',type:'spline',data:_targetList,color:'red'});

							//set categories
							chart_year.xAxis[0].setCategories(_cat);

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
		chart_year = new Highcharts.Chart({
			title: {
				text: ''
			},
			chart: { 
				renderTo: 'yearly_chart', //设置显示的页面块
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