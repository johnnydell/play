var prodSummaryChart1 = function(){
	var years = []; 
	var _dataSource = [];
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
					bindChart();
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
	        				console.log(listdata);
	        				var _dataSource = [];
	        				years = listdata.yearList;
	        				dataList = listdata.dataList;
	        				var brand_chart = $('.top .lft .chart .chart').highcharts();
	        				for(i = 0; i < dataList.length; i ++){
	        					var _tmp = {};
	        					_tmp.type = 'column';
	        					var _datas = [];
	        					for(j = 0; j < dataList[i].actualdata.length; j ++){
	        						_datas.push(parseFloat(dataList[i].actualdata[j]));
	        					}
	        					_tmp.data = _datas;
	        					_tmp.name = dataList[i].lineName;
	        					brand_chart.addSeries(_tmp);
	        				}
	        				brand_chart.addSeries({name:'target',type:'spline',data:[0.5,0.5,0.5,0.5],color:'red'});
	        				
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
		        	layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            floating: false,
		            symbolRadius: 0
		        },
		        xAxis: {
		            categories: years
		        },
		        yAxis: {
		            title: {
		                text: ''
		            },
		            tickPositions: [0,0.1,0.2,0.3,0.5,0.9], // 指定竖轴坐标点的值
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