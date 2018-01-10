var scrapChart1 = function(){
	var years = []; 
	var targetTotalList = []; 
	var actualTotalList = [];
	function init(lineName, curYear){
	   //渲染chart1部分
	   $.get(manager.root+"/views/tpl/board2/scrapChart1.html", function (template) {
	        var ractive = new Ractive({
	            el: '.cxt .top .lft',
	            data:{root:manager.root},
	            template: template,
	            onrender: function(){
					manager.loadProperties(this, "safety", "../../");
					manager.loadProperties(this, "common", "../../");
				},
	            oncomplete: function(){
	            	/**/
	            	$.ajax({
	        			url		: manager.root + '/report/scrap/yearlyScrapChart',
	        			type	: 'GET',
	        			dataType:"json",
	        			data:{lineName:lineName,yearValue:curYear},
	        			success: function(listdata)
	        			{
	        				years = [];
	        				targetTotalList = []; 
	        				actualTotalList = [];
	        				for(i = 0; i < listdata.length; i ++){
	        					years.push(listdata[i].years);
	        					
	        					//var oee_percent = (listdata[i].target_oee_percent * 1).toFixed(1);
	        					targetTotalList.push(7000);
	        					//calculate actual OEE percentage
	        					var scrapTotal = listdata[i].scrapTotal;
	        					var actualTotal = listdata[i].actualTotal;
	        					if (parseInt(actualTotal) == 0)
	        						actualTotalList.push(0);
	        					else{
	        						actualTotalList.push(Math.ceil(scrapTotal * 1000000 / actualTotal));
	        					}
	        				}
	        				bindChart();
	        				ractive.set("targetTotal", targetTotalList);
	        				ractive.set("actualTotal", actualTotalList);
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
	            enabled: false
	        },
	        xAxis: {
	            categories: years
	        },
	        yAxis: {
	            title: {
	            	text: $.i18n.map['i18n_ppm'],
	                margin:65,
	                style: {
	                	fontSize: '15px',
	                	fontWeight:'bold',
	                	color:'black'
	                }
	            },
	            tickPositions: [0,  2000,4000,6000,8000,10000], // 指定竖轴坐标点的值
	            labels: {
	                formatter: function() {
	                    return this.value;
	                },
	            }	
	        },
	        series: [{
	            type: 'column',
	            name: $.i18n.map['i18n_actual'],
	            data: actualTotalList,
	            color:'#3C3C4D'
	        }, {
	            type: 'spline',
	            name: $.i18n.map['i18n_target'],
	            color:'red',
	            data: targetTotalList,
	            marker: {
	                enabled: false
	            }
	        }],
	        credits:{
	            enabled:false
	        }
	    });	
	}
	
		
	return {
		init:init
	}
}();