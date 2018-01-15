var prodSummaryChart1 = function(){
	var years = []; 
	
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
	        				years = listdata.yearList;
	        				dataList = listdata.dataList;
	        				// Categories values
        					var _cat = [];
	        				var brand_chart = $('.top .lft .chart .chart').highcharts();
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
	        				}
	        				
	        				for(i = 0; i < years.length; i ++){
	        					_cat.push(years[i]);
	        				}
	        				
	        				//set target
	        				targetList = [20.5,20.5,20.5,20.5];
	        				brand_chart.addSeries({name:'target',type:'spline',data:targetList,color:'red'});
	        				
	        				//set categories
	        				brand_chart.xAxis[0].setCategories(_cat);
	        				
	        				//plot to table
	        				ractive.set("dataList", dataList);
	        				ractive.set("yearList", years);
	        				ractive.set("targetList", targetList);
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